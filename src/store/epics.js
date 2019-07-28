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
  FETCH_PLAYLIST_TRACKS
} from './actions';

const spotifyScope =
  'user-read-private%20user-read-email%20playlist-read-collaborative%20playlist-read-private';

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
      if (!state.user && !state.router.location.hash) {
        window.location = `https://accounts.spotify.com/authorize?client_id=${
          CONFIG.spotify.clientId
        }&redirect_uri=${encodeURI(
          'http://localhost:8080/'
        )}&scope=${spotifyScope}&response_type=token&state=123`;
      } else if (
        !state.user &&
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
          Authorization: `Bearer ${state$.value.user}`
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
          Authorization: `Bearer ${state$.value.user}`
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
                  Authorization: `Bearer ${state$.value.user}`
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

// Fetch album for track -> select random track
// GET https://api.spotify.com/v1/albums/{id}/tracks
// POST https://api.spotify.com/v1/users/{user_id}/playlists
// POST https://api.spotify.com/v1/playlists/{playlist_id}/tracks
// GET https://api.spotify.com/v1/me

export default combineEpics(
  initUserEpic,
  fetchPlaylistsEpic,
  fetchPlaylistTracksEpic
);
