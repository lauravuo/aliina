import { combineReducers } from 'redux';
import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';

import {
  BUTTON_PRESSED,
  SET_TOKEN,
  FETCH_PLAYLISTS_FULFILLED,
  FETCH_PLAYLIST_TRACKS_FULFILLED
} from './actions';
import initialState from './initial-state';

export const button = (state = initialState.button, action) => {
  switch (action.type) {
    case BUTTON_PRESSED:
      return { ...state, pressed: !state.pressed };
    default:
      return state;
  }
};

export const user = (state = initialState.user, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export const playlists = (state = initialState.playlists, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS_FULFILLED:
      return action.payload.items.map(({ id, name }) => ({ id, name }));
    default:
      return state;
  }
};

export const newPlaylist = (state = initialState.newPlaylist, action) => {
  switch (action.type) {
    case FETCH_PLAYLIST_TRACKS_FULFILLED: {
      const selected = action.payload.map(result => {
        const index = Math.floor(Math.random() * result.items.length);
        return result.items[index];
      });
      return selected;
    }
    default:
      return state;
  }
};

export const error = (state = initialState.error, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default history =>
  combineReducers({
    router: connectRouter(history),
    button,
    user,
    playlists,
    newPlaylist,
    error
  });
