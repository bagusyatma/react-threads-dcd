import { hideLoading, showLoading } from 'react-redux-loading-bar';
import authenticationApi from '../../api/authentication';
import { putAccessToken } from '../../utils/api';

export const ActionTypes = {
  SET_AUTH_USER: 'authUser/set',
  UNSET_AUTH_USER: 'authUser/unset',
};

export const setAuthUserActionCreator = (authUser) => ({
  type: ActionTypes.SET_AUTH_USER,
  payload: {
    authUser,
  },
});

export const unsetAuthUserActionCreator = () => ({
  type: ActionTypes.UNSET_AUTH_USER,
  payload: {
    authUser: null,
  },
});

export const asyncSetAuthUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      const token = await authenticationApi.login({ email, password });
      putAccessToken(token);

      const authUser = await authenticationApi.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };

export const asyncUnsetAuthUser = () => async (dispatch) => {
  dispatch(unsetAuthUserActionCreator());
  putAccessToken('');
};
