import { ActionTypes } from './action';

const authUserReducer = (authUser = null, action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH_USER:
      return action.payload.authUser;

    case ActionTypes.UNSET_AUTH_USER:
      return null;

    default:
      return authUser;
  }
};

export default authUserReducer;
