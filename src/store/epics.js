import { empty, of, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  catchError,
  toArray
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  setToken,
  SET_TOKEN,
  fetchPlaylistsFulfilled,
  fetchPlaylistTracksFulfilled,
  fetchFailed,
  FETCH_PLAYLIST_TRACKS,
  fetchUserIdFulfilled,
  CREATE_NEW_PLAYLIST,
  createNewPlaylistFulfilled
} from './actions';

const spotifyScope = encodeURI(
  'user-read-private,user-read-email,playlist-read-collaborative,playlist-read-private,playlist-modify-private,playlist-modify-public'
);

const parseHash = hash => {
  const parts = hash.replace('#', '').split('&');
  const found = parts.find(item => item.includes('access_token'));
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
          'http://localhost:8080/'
        )}&scope=${spotifyScope}&response_type=token&state=123`;
      } else if (
        !state.user.token &&
        !state.playlists &&
        state.router.location.hash
      ) {
        return of(setToken(parseHash(state.router.location.hash)));
      }
      return empty();
    })
  );

const fetchPlaylistsEpic = (action$, state$) =>
  action$.pipe(
    ofType(SET_TOKEN),
    mergeMap(() =>
      ajax({
        url: 'https://api.spotify.com/v1/me/playlists',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${state$.value.user.token}`
        }
      }).pipe(
        map(({ response }) => fetchPlaylistsFulfilled(response)),
        catchError(error => of(fetchFailed(error.xhr.response)))
      )
    )
  );

const fetchPlaylistTracksEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_PLAYLIST_TRACKS),
    mergeMap(action =>
      ajax({
        url: `https://api.spotify.com/v1/playlists/${action.payload}/tracks`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${state$.value.user.token}`
        }
      }).pipe(
        map(({ response: { items } }) => items),
        mergeMap(tracks =>
          from(tracks).pipe(
            mergeMap(({ track: { track_number: number, album: { id } } }) => {
              return ajax({
                url: `https://api.spotify.com/v1/albums/${id}/tracks`,
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${state$.value.user.token}`
                }
              }).pipe(
                map(({ response }) => ({
                  ...response,
                  items: response.items.filter(
                    item => item.track_number !== number
                  )
                }))
              );
            }),
            toArray()
          )
        ),
        map(responses => fetchPlaylistTracksFulfilled(responses)),
        catchError(error => of(fetchFailed(error.xhr.response)))
      )
    )
  );

const fetchUserId = (action$, state$) =>
  action$.pipe(
    ofType(SET_TOKEN),
    mergeMap(() =>
      ajax({
        url: 'https://api.spotify.com/v1/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${state$.value.user.token}`
        }
      }).pipe(
        map(({ response }) => fetchUserIdFulfilled(response)),
        catchError(error => of(fetchFailed(error.xhr.response)))
      )
    )
  );

const createNewPlaylist = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_NEW_PLAYLIST),
    mergeMap(() =>
      ajax({
        url: `https://api.spotify.com/v1/users/${state$.value.user.id}/playlists`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state$.value.user.token}`,
          'Content-Type': 'application/json'
        },
        body: {
          name: 'Aliina-generated-playlist'
        }
      }).pipe(
        map(() => createNewPlaylistFulfilled()),
        catchError(error => of(fetchFailed(error.xhr.response)))
      )
    )
  );

// POST https://api.spotify.com/v1/users/{user_id}/playlists
// POST https://api.spotify.com/v1/playlists/{playlist_id}/tracks

export default combineEpics(
  initUserEpic,
  fetchPlaylistsEpic,
  fetchPlaylistTracksEpic,
  fetchUserId,
  createNewPlaylist
);
