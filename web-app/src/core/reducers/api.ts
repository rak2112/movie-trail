import * as actions from '../actions';
import { Api } from '../interfaces';

export type ApiState = Api | null

export const api = ( state: ApiState = {isFetching: true, hasError: false}, action: actions.ApiActionError): ApiState => {
  
  switch (action.type) {
    case actions.API_REQUEST:
      return { 
        ...state, 
        isFetching: true
      };
    case actions.API_RESPONSE:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        errorMessage: ''
      };
    case actions.API_ERROR:
      return {
        ...state, 
        hasError: true,
        errorMessage: action.error
      };
    default: 
      return state;
  }
};