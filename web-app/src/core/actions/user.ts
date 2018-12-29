// tslint:disable:max-classes-per-file
import { Action } from 'redux';
import { FormValues, User } from '../interfaces';

const app = '[movieBase]';
export const LOG_IN_REQUEST = `${app} user login request`;
export const LOG_IN_SUCCESS = `${LOG_IN_REQUEST} success`;
export const LOG_OUT_REQUEST = `${app} user logout request`;
export const LOG_OUT_SUCESS = `${LOG_OUT_REQUEST} success`;

export const SIGN_UP_REQUEST = `${app} user signup request`;
export const SIGN_UP_REQUEST_SUCCESS = `${SIGN_UP_REQUEST} success`;

export const PASSWORD_RESET_REQUEST = `${app} user password reset request`;
export const PASSWORD_RESET_REQUEST_SUCCESS = `${PASSWORD_RESET_REQUEST} success`;

export const RESET_PASSWORD = `${app} reset user passsword`;
export const RESET_PASSWORD_SUCCESS = `${RESET_PASSWORD} success`;

export class LoginRequest implements Action {
  readonly type = LOG_IN_REQUEST
  constructor(public readonly formValues: FormValues){}
}

export class LoginRequestSuccess implements Action {
  readonly type = LOG_IN_SUCCESS
  constructor(public readonly res: User) {}
}

export class LogoutRequest implements Action {
  readonly type = LOG_OUT_REQUEST
}

export class LogoutRequestSuccess implements Action {
  readonly type = LOG_OUT_SUCESS
}

export class SignUpRequest implements Action {
  readonly type = SIGN_UP_REQUEST
  constructor(public readonly formValues: FormValues){}
}

export class SignUpRequestSuccess implements Action {
  readonly type = SIGN_UP_REQUEST_SUCCESS
  constructor(public readonly res: User) {}
}

export class RestPasswordRequest implements Action {
  readonly type = PASSWORD_RESET_REQUEST
  constructor(public readonly formValues: FormValues){}
}

export class RestPasswordRequestSuccess implements Action {
  readonly type = PASSWORD_RESET_REQUEST
  constructor(public readonly res: User){}
}

export class RestPassword implements Action {
  readonly type = RESET_PASSWORD
  constructor(public readonly formValues: FormValues){}
}

export const loginRequest = (formValues: FormValues): LoginRequest => ({ type: LOG_IN_REQUEST, formValues });
export const logoutRequest = (): LogoutRequest => ({ type: LOG_OUT_REQUEST });
export const loginRequestSuccess = (res: User): LoginRequestSuccess => ({ type: LOG_IN_SUCCESS, res});
export const logoutRequestSuccess = (): LogoutRequestSuccess => ({ type: LOG_OUT_SUCESS });

export const signUpRequest = (formValues: FormValues): SignUpRequest => ({ type: SIGN_UP_REQUEST, formValues });
export const signUpRequestSuccess = (res: User): SignUpRequestSuccess => ({ type: SIGN_UP_REQUEST_SUCCESS, res });

export const resetPasswordRequest = (formValues: FormValues): RestPasswordRequest => ({ type: PASSWORD_RESET_REQUEST, formValues });
export const resetPasswordRequestSuccess = (res: User): RestPasswordRequestSuccess => ({ type: PASSWORD_RESET_REQUEST_SUCCESS, res });

export const resetPassword = (formValues: FormValues): RestPassword => ({ type: RESET_PASSWORD, formValues });

export type UserAction = 
  | LoginRequestSuccess
  | RestPasswordRequestSuccess;
