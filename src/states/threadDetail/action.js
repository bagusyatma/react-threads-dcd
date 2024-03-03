import { hideLoading, showLoading } from 'react-redux-loading-bar';
import threadsApi from '../../api/threads';
import commentsApi from '../../api/comments';

export const ActionTypes = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',
  CREATE_COMMENT_THREAD_DETAIL: 'threadDetail/createComment',
};

export const receiveThreadDetailActionCreator = (threadDetail) => ({
  type: ActionTypes.RECEIVE_THREAD_DETAIL,
  payload: {
    threadDetail,
  },
});

export const clearThreadDetailActionCreator = () => ({
  type: ActionTypes.CLEAR_THREAD_DETAIL,
});

export const createCommentThreadDetailActionCreator = (comment) => ({
  type: ActionTypes.CREATE_COMMENT_THREAD_DETAIL,
  payload: {
    comment,
  },
});

export const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  dispatch(clearThreadDetailActionCreator());

  try {
    const threadDetail = await threadsApi.getDetailThread(threadId);
    dispatch(receiveThreadDetailActionCreator(threadDetail));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

export const asyncCreateCommentThreadDetail =
  ({ content, threadId }) =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await commentsApi.createComment(content, threadId);
      dispatch(createCommentThreadDetailActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
