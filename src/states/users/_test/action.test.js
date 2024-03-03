// Scenario Testing
// - asyncRegisterUser function
//   - should dispatch action correctly when data fetching is successful
//   - should dispatch action correctly when data fetching is failed

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import authenticationApi from '../../../api/authentication';
import { asyncRegisterUser } from '../action';

const fakeUsersPayload = {
  name: 'user 1',
  email: 'user@email.com',
  password: 'password',
};

const fakeUsersResponse = {
  id: 'user-1',
  name: 'user 1',
  email: 'user@email.com',
  avatar: 'https://ui-avatars.com/api/?name=user+1&background=random',
};

const fakeErrorResponse = new Error('Ups, something went wrong!');

describe('asyncRegisterUser function', () => {
  beforeEach(() => {
    authenticationApi._register = authenticationApi.register;
  });

  afterEach(() => {
    authenticationApi.register = authenticationApi._register;

    delete authenticationApi._register;
  });

  it('should dispatch action correctly when data fetching is successful', async () => {
    // arrange
    authenticationApi.register = () => Promise.resolve(fakeUsersResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // act
    await asyncRegisterUser(fakeUsersPayload)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching is failed', async () => {
    // arrange
    authenticationApi.register = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // act
    await asyncRegisterUser(fakeUsersPayload)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
