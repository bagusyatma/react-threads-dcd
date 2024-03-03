import { ActionTypes } from './action';

const threadsReducer = (threads = [], action = {}) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionTypes.ADD_THREAD:
      return [action.payload.thread, ...threads];
    default:
      return threads;
  }
};

export default threadsReducer;
