import { button as reducer } from './reducers';
import initialState from './initial-state';
import { buttonPress } from './actions';

describe('button reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.button);
  });
  it('should toggle pressed state', () => {
    expect(reducer(undefined, buttonPress())).toEqual({
      ...initialState.button,
      pressed: true
    });
  });
});
