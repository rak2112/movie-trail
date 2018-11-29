import * as actions from '../actions';
import { User } from '../interfaces';

export type UserState = User | null;

export const userReducer = ( state: UserState = null, action: actions.UserAction): UserState => {

  if(action.type === actions.LOG_IN_SUCCESS) {
    return action.res;
  }

  if(action.type === actions.LOG_OUT_SUCESS) {
    return state = null;
  }
  return state;
};

