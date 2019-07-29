import { user as reducer } from './reducers';
import initialState from './initial-state';
import { setToken } from './actions';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.user);
  });
  it('should set token', () => {
    expect(reducer(undefined, setToken('token'))).toEqual({
      token: 'token'
    });
  });
});
