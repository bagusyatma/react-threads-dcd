// Scenario Testing
// - threadsReducer
//   - should return the initial state when given an unknown action
//   - should return the new threads when given the threads/receive action
//   - should return the new threads when given the threads/add action

import { describe, expect, it } from 'vitest';
import threadsReducer from '../reducer';

describe('threadsReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'unknownAction' };

    // act
    const result = threadsReducer(initialState, action);

    // assert
    expect(result).toEqual(initialState);
  });

  it('should return the new threads when given the threads/receive action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'threads/receive',
      payload: {
        threads: [
          {
            id: 1,
            title: 'thread 1',
            body: 'thread 1 body',
            category: 'category 1',
            comments: [],
            createdAt: '2022-01-01T00:00:00.000Z',
            owner: { id: 1, name: 'user 1' },
          },
        ],
      },
    };

    // act
    const result = threadsReducer(initialState, action);

    // assert
    expect(result).toEqual(action.payload.threads);
  });

  it('should return the new threads when given the threads/add action', () => {
    // arrange
    const initialState = [
      {
        id: 1,
        title: 'thread 1',
        body: 'thread 1 body',
        category: 'category 1',
        comments: [],
        createdAt: '2022-01-01T00:00:00.000Z',
        owner: { id: 1, name: 'user 1' },
      },
    ];

    const newThread = {
      id: 2,
      title: 'thread 2',
      body: 'thread 2 body',
      category: 'category 2',
      comments: [],
      createdAt: '2022-01-01T00:00:00.000Z',
      owner: { id: 2, name: 'user 2' },
    };

    const action = {
      type: 'threads/add',
      payload: {
        thread: newThread,
      },
    };

    // act
    const result = threadsReducer(initialState, action);

    // assert
    expect(result).toEqual([newThread, ...initialState]);
  });
});
