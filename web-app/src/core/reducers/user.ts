import * as actions from '../actions';
import { User } from '../interfaces';

export type UserState = User | null;

export const user = ( state: UserState = null, action: actions.UserAction): UserState => {

  if(action.type === actions.LOG_IN_SUCCESS) {
    return action.res;
  }

  if(action.type === actions.LOG_OUT_SUCESS) {
    return state = null;
  }

  if(action.type === actions.PASSWORD_RESET_REQUEST_SUCCESS) {
    return action.res;
  }
  return state;
};
