import { empty, of, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  mergeMap,
  switchMap,
  catchError,
  toArray,
  bufferCount,
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { LOCATION_CHANGE, replace } from 'connected-react-router';

import {
  setToken,
  SET_TOKEN,
  fetchPlaylistsFulfilled,
  fetchPlaylistTracksFulfilled,
  fetchFailed,
  FETCH_PLAYLIST_TRACKS,
  fetchUserIdFulfilled,
  CREATE_NEW_PLAYLIST,
  createNewPlaylistFulfilled,
  CREATE_NEW_PLAYLIST_FULFILLED,
  savePlaylistComplete,
} from './actions';

const spotifyMaxAlbumsFetch = 20;
const spotifyScope = encodeURI(
  'user-read-private,user-read-email,playlist-read-collaborative,playlist-read-private,playlist-modify-private,playlist-modify-public'
);

const getUrl = (
  url,
  {
    value: {
      user: { token },
    },
  }
) => ({
  url,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const parseHash = (hash) => {
  const parts = hash.replace('#', '').split('&');
  const found = parts.find((item) => item.includes('access_token'));
  const token = found.split('=')[1];
  return token;
};

const initUserEpic = (action$, state$) =>
  action$.pipe(
    ofType(LOCATION_CHANGE),
    switchMap(() => {
      const state = state$.value;
      if (!state.user.token && !state.router.location.hash) {
        window.location = `https://accounts.spotify.com/authorize?client_id=${
          CONFIG.spotify.clientId
        }&redirect_uri=${encodeURI(
          CONFIG.spotify.redirectUri
        )}&scope=${spotifyScope}&response_type=token&state=123`;
      } else if (
        !state.user.token &&
        state.playlists.content.length === 0 &&
        state.router.location.hash
      ) {
        return of(setToken(parseHash(state.router.location.hash)));
      }
      return empty();
    })
  );

const redirectEpic = (action$) =>
  action$.pipe(
    ofType(SET_TOKEN),
    switchMap(() => of(replace('/')))
  );

const fetchPlaylistsEpic = (action$, state$) =>
  action$.pipe(
    ofType(SET_TOKEN),
    mergeMap(() =>
      ajax(getUrl('https://api.spotify.com/v1/me/playlists', state$)).pipe(
        map(({ response }) => fetchPlaylistsFulfilled(response)),
        catchError((error) => of(fetchFailed(error.xhr.response)))
      )
    )
  );

const fetchPlaylistTracksEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_PLAYLIST_TRACKS),
    mergeMap((action) =>
      ajax(
        getUrl(
          `https://api.spotify.com/v1/playlists/${action.payload}/tracks`,
          state$
        )
      ).pipe(
        map(({ response: { items } }) => items),
        mergeMap((tracks) =>
          from(tracks).pipe(
            bufferCount(spotifyMaxAlbumsFetch),
            mergeMap((items) => {
              const ids = items.reduce(
                (
                  result,
                  {
                    track: {
                      track_number: number,
                      album: { id },
                    },
                  }
                ) => ({
                  query: result.query + (result.query !== '' ? ',' : '') + id,
                  trackNumbers: { ...result.trackNumbers, [id]: number },
                }),
                { query: '', trackNumbers: {} }
              );
              return ajax(
                getUrl(
                  `https://api.spotify.com/v1/albums?ids=${ids.query}`,
                  state$
                )
              ).pipe(
                map(({ response }) => {
                  return response.albums.map(({ id, tracks: albumTracks }) => ({
                    items: albumTracks.items.filter(
                      (item) => item.track_number !== ids.trackNumbers[id]
                    ),
                  }));
                })
              );
            })
          )
        ),
        toArray(),
        map((responses) =>
          fetchPlaylistTracksFulfilled(
            responses.reduce((res, item) => [...res, ...item], [])
          )
        ),
        catchError((error) => of(fetchFailed(error.xhr.response)))
      )
    )
  );

const fetchUserId = (action$, state$) =>
  action$.pipe(
    ofType(SET_TOKEN),
    mergeMap(() =>
      ajax(getUrl('https://api.spotify.com/v1/me', state$)).pipe(
        map(({ response }) => fetchUserIdFulfilled(response)),
        catchError((error) => of(fetchFailed(error.xhr.response)))
      )
    )
  );

const createNewPlaylist = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_NEW_PLAYLIST),
    mergeMap(({ payload }) =>
      ajax({
        url: `https://api.spotify.com/v1/users/${state$.value.user.id}/playlists`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state$.value.user.token}`,
          'Content-Type': 'application/json',
        },
        body: {
          name: payload,
        },
      }).pipe(
        map(({ response }) => createNewPlaylistFulfilled(response.id)),
        catchError((error) => of(fetchFailed(error.xhr.response)))
      )
    )
  );

const addTracksToPlaylist = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_NEW_PLAYLIST_FULFILLED),
    mergeMap(() =>
      ajax({
        url: `https://api.spotify.com/v1/playlists/${state$.value.newPlaylist.newId}/tracks`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state$.value.user.token}`,
          'Content-Type': 'application/json',
        },
        body: {
          uris: state$.value.newPlaylist.content.map((item) => item.uri),
        },
      }).pipe(
        map(() => savePlaylistComplete()),
        catchError((error) => of(fetchFailed(error.xhr.response)))
      )
    )
  );

export default combineEpics(
  initUserEpic,
  redirectEpic,
  fetchPlaylistsEpic,
  fetchPlaylistTracksEpic,
  fetchUserId,
  createNewPlaylist,
  addTracksToPlaylist
);
