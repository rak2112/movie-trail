import base64 from 'base-64';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { http } from '../../index';
import { FormValues, User, UserMovie } from '../interfaces';

export const getUser = (formValues: FormValues): Observable<User> => {
  const { username: email, password } = formValues;
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
  const { username: email, password } = formValues;
  return  http.post( `/api/user/signup`, {
    email, password
  }).pipe(
    map(({ response }) => response)
  )
};

export const resetUserPassword = (formValues: FormValues): Observable<{}> => {
  console.log('passssss', formValues);
  const { token, ...reset } = formValues;
  return  http.post( `/api/user/account/reset/${token}`, {
    ...reset
  }).pipe(
    map(({ response }) => response)
  )
};

export const getUserMovies = (): Observable<UserMovie[]> => {
  return  http.getJSON( `/api/movies`).pipe(
    map((res: UserMovie[]) => res)
  )
};
