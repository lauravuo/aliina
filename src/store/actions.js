export const BUTTON_PRESSED = 'BUTTON_PRESSED';

export const buttonPress = () => ({
  type: BUTTON_PRESSED
});

export const SET_TOKEN = 'SET_TOKEN';

export const setToken = token => ({ type: SET_TOKEN, payload: token });

export const FETCH_PLAYLISTS_FULFILLED = 'FETCH_PLAYLISTS_FULFILLED';

export const fetchPlaylistsFulfilled = response => ({
  type: FETCH_PLAYLISTS_FULFILLED,
  payload: response
});

export const FETCH_FAILED = 'FETCH_FAILED';

export const fetchFailed = error => ({ type: FETCH_FAILED, payload: error });

export const FETCH_PLAYLIST_TRACKS = 'FETCH_PLAYLIST_TRACKS';

export const fetchPlaylistTracks = payload => ({
  type: FETCH_PLAYLIST_TRACKS,
  payload
});

export const FETCH_PLAYLIST_TRACKS_FULFILLED =
  'FETCH_PLAYLIST_TRACKS_FULFILLED';

export const fetchPlaylistTracksFulfilled = response => ({
  type: FETCH_PLAYLIST_TRACKS_FULFILLED,
  payload: response
});

export const FETCH_USER_ID_FULFILLED = 'FETCH_USER_ID_FULFILLED';

export const fetchUserIdFulfilled = response => ({
  type: FETCH_USER_ID_FULFILLED,
  payload: response
});
