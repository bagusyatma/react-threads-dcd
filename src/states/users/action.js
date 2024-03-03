import { hideLoading, showLoading } from 'react-redux-loading-bar';
import authenticationApi from '../../api/authentication';

export const ActionTypes = {
  RECEIVE_USERS: 'users/receive',
};

export const receiveUsersActionCreator = (users) => ({
  type: ActionTypes.RECEIVE_USERS,
  payload: {
    users,
  },
});

export const asyncRegisterUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      await authenticationApi.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
