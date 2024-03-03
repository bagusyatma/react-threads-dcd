// Scenario Testing
// - asyncAddThread function
//   - should dispatch action correctly when data fetching is successful
//   - should dispatch action correctly when data fetching is failed

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import threadsApi from '../../../api/threads';
import { addThreadActionCreator, asyncAddThread } from '../action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const fakeThreadsPayload = {
  title: 'thread 1',
  body: 'thread 1 body',
  category: 'category 1',
};

const fakeThreadsResponse = {
  thread: {
    id: 'thread-1',
    title: 'thread 1',
    body: 'thread 1 body',
    category: 'category 1',
    createdAt: '2022-01-01T00:00:00.000Z',
    ownerId: 'user-1',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
  },
};

const fakeErrorResponse = new Error('Ups, something went wrong!');

describe('asyncAddThread function', () => {
  beforeEach(() => {
    threadsApi._createThread = threadsApi.createThread;
  });

  afterEach(() => {
    threadsApi.createThread = threadsApi._createThread;

    delete threadsApi._createThread;
  });

  it('should dispatch action correctly when data fetching is successful', async () => {
    // arrange
    threadsApi.createThread = () => Promise.resolve(fakeThreadsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // act
    await asyncAddThread(fakeThreadsPayload)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching is failed', async () => {
    // arrange
    threadsApi.createThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // act
    await asyncAddThread(fakeThreadsPayload)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
