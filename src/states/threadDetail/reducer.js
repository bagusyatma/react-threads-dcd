import { ActionTypes } from './action';

const threadDetailReducer = (threadDetail = null, action = {}) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionTypes.CLEAR_THREAD_DETAIL:
      return null;
    case ActionTypes.CREATE_COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    default:
      return threadDetail;
  }
};

export default threadDetailReducer;
