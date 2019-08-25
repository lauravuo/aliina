import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import {
  SET_TOKEN,
  FETCH_PLAYLISTS_FULFILLED,
  FETCH_PLAYLIST_TRACKS_FULFILLED,
  FETCH_USER_ID_FULFILLED,
  FETCH_PLAYLIST_TRACKS,
  CREATE_NEW_PLAYLIST_FULFILLED,
  CREATE_NEW_PLAYLIST,
  SAVE_PLAYLIST_COMPLETE
} from './actions';
import initialState from './initial-state';

export const user = (state = initialState.user, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { token: action.payload };
    case FETCH_USER_ID_FULFILLED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const playlists = (state = initialState.playlists, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS_FULFILLED:
      return {
        ...state,
        content: action.payload.items.map(({ id, name }) => ({ id, name }))
      };
    default:
      return state;
  }
};

export const newPlaylist = (state = initialState.newPlaylist, action) => {
  switch (action.type) {
    case FETCH_PLAYLIST_TRACKS:
      return {
        ...initialState.newPlaylist,
        originalId: action.payload
      };
    case FETCH_PLAYLIST_TRACKS_FULFILLED: {
      const selected = action.payload
        .filter(item => item.items.length > 0)
        .map(result => {
          const index = Math.floor(Math.random() * result.items.length);
          return result.items[index];
        });
      return {
        ...state,
        content: selected
      };
    }
    case CREATE_NEW_PLAYLIST:
      return {
        ...state,
        saving: true
      };
    case CREATE_NEW_PLAYLIST_FULFILLED: {
      return {
        ...state,
        newId: action.payload
      };
    }
    case SAVE_PLAYLIST_COMPLETE:
      return {
        ...state,
        saving: false
      };
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
    user,
    playlists,
    newPlaylist,
    error
  });
