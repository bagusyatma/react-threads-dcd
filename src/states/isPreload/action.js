import { hideLoading, showLoading } from 'react-redux-loading-bar';
import authenticationApi from '../../api/authentication';
import { setAuthUserActionCreator } from '../authUser/action';

export const ActionTypes = {
  SET_IS_PRELOAD: 'isPreload/set',
};

export const setIsPreloadActionCreator = (isPreload) => ({
  type: ActionTypes.SET_IS_PRELOAD,
  payload: {
    isPreload,
  },
});

export const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const authUser = await authenticationApi.getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    dispatch(setAuthUserActionCreator(null));
  } finally {
    dispatch(setIsPreloadActionCreator(false));
  }

  dispatch(hideLoading());
};
