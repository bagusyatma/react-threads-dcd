// Scenario Testing
// - usersReducer
//   - should return the initial state when given an unknown action
//   - should return the new users when given the users/receive action

import { describe, expect, it } from 'vitest';
import usersReducer from '../reducer';

describe('usersReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'unknownAction' };

    // act
    const result = usersReducer(initialState, action);

    // assert
    expect(result).toEqual(initialState);
  });

  it('should return the new users when given the users/receive action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'users/receive',
      payload: {
        users: [
          {
            id: 1,
            name: 'user 1',
            email: 'user@email.com',
            password: 'password',
          },
        ],
      },
    };

    // act
    const result = usersReducer(initialState, action);

    // assert
    expect(result).toEqual(action.payload.users);
  });
});
