import { hideLoading, showLoading } from 'react-redux-loading-bar';
import threadsApi from '../../api/threads';

export const ActionTypes = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'threads/add',
};

export const receiveThreadsActionCreator = (threads) => ({
  type: ActionTypes.RECEIVE_THREADS,
  payload: {
    threads,
  },
});

export const addThreadActionCreator = (thread) => ({
  type: ActionTypes.ADD_THREAD,
  payload: {
    thread,
  },
});

export const asyncAddThread =
  ({ title, body, category = '' }) =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await threadsApi.createThread({ title, body, category });

      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
