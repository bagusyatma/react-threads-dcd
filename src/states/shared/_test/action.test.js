// Scenario Testing
// - asyncPopulateData function
//   - should dispatch action correctly when data fetching is successful
//   - should dispatch action correctly when data fetching is failed

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import authenticationApi from '../../../api/authentication';
import threadsApi from '../../../api/threads';
import { receiveThreadsActionCreator } from '../../threads/action';
import { receiveUsersActionCreator } from '../../users/action';
import { asyncPopulateData } from '../action';

const fakeThreadsResponse = [
  {
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
];

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'user 1',
    email: 'user@email.com',
    avatar: 'https://ui-avatars.com/api/?name=user+1&background=random',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong!');

describe('asyncPopulateData function', () => {
  beforeEach(() => {
    threadsApi._getAllThreads = threadsApi.getAllThreads;
    authenticationApi._getAllUsers = authenticationApi.getAllUsers;
  });

  afterEach(() => {
    threadsApi.getAllThreads = threadsApi._getAllThreads;
    authenticationApi.getAllUsers = authenticationApi._getAllUsers;

    delete threadsApi._getAllThreads;
    delete authenticationApi._getAllUsers;
  });

  it('should dispatch action correctly when data fetching is successful', async () => {
    // arrange
    threadsApi.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    authenticationApi.getAllUsers = () => Promise.resolve(fakeUsersResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // act
    await asyncPopulateData()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching is failed', async () => {
    // arrange
    threadsApi.getAllThreads = () => Promise.reject(fakeErrorResponse);
    authenticationApi.getAllUsers = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // act
    await asyncPopulateData()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
