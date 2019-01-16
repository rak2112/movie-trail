// tslint:disable:max-classes-per-file
import { Action } from 'redux';

const app = '[movieBase]';
export const API_REQUEST = `${app} Pending api request`;
export const API_RESPONSE = `${app} Completed api request`;
export const API_ERROR = `${app} Api error`;


export class ApiRequest implements Action {
  readonly type = API_REQUEST
}

export class ApiResponse implements Action {
  readonly type = API_RESPONSE
}

export class ApiError implements Action {
  readonly type = API_ERROR
  constructor(public readonly error: string) {}
}

export const apiRequest = (): ApiRequest => ({ type: API_REQUEST });
export const apiResponse = (): ApiResponse => ({ type: API_RESPONSE});
export const apiError = (error: string): ApiError => ({ type: API_ERROR, error});

export type ApiAction =
  | ApiRequest 
  | ApiResponse;

export type ApiActionError = ApiError;
