import base64 from 'base-64';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { http } from '../../app';
import { FormValues, User, UserMovie } from '../interfaces';

export const getUser = (formValues: FormValues): Observable<User> => {
  const { email, password } = formValues;
  const auth = 'Basic ' + base64.encode(`${email}:${password}`);
  const headers = {
    'Authorization': auth
  };
  return http.getJSON( `/api/user/login`, headers).pipe(
    map((res: User): User => res)
  )
};

export const logOutUser = (): Observable<{}> => {
  return  http.post( `/api/user/logout`).pipe(
    map(res => res)
  )
};

export const signUpUser = (formValues: FormValues): Observable<{}> => {
  const { name: displayName, ...props } = formValues;
  return  http.post( `/api/user/signup`, {
    ...props, displayName
  }).pipe(
    map(({ response }) => response)
  )
};

export const resetUserPassword = (formValues: FormValues): Observable<{}> => {
  const { token, ...reset } = formValues;
  return  http.post( `/api/user/account/reset/${token}`, {
    ...reset
  }).pipe(
    map(({ response }) => response)
  )
};

export const sendResetRequest = ({ email }: FormValues): Observable<{}> => {
  return  http.post( `/api/user/account/reset/token`, {
    email
  }).pipe(
    map(({ response }) => response)
  )
};

export const getUserMovies = (): Observable<UserMovie[]> => {
  return  http.getJSON( `/api/movies`).pipe(
    map((res: UserMovie[]) => res)
  )
};

