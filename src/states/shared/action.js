import { hideLoading, showLoading } from 'react-redux-loading-bar';
import authenticationApi from '../../api/authentication';
import threadsApi from '../../api/threads';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

export const asyncPopulateData = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const users = await authenticationApi.getAllUsers();
    const threads = await threadsApi.getAllThreads();

    dispatch(receiveUsersActionCreator(users));
    dispatch(receiveThreadsActionCreator(threads));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};
