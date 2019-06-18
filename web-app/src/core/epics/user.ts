import { ofType } from "redux-observable";
import { forkJoin } from 'rxjs';
import { catchError, map, mapTo, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import { State } from '../reducers';

import * as actions from '../actions';
import { User, UserMovie } from '../interfaces';
import { history } from '../routes';
import * as service from '../utils';

import { push } from 'react-router-redux';

export const userLogin = (action$: any, state$: any) => action$.pipe (
  ofType(actions.LOG_IN_REQUEST),
  withLatestFrom(state$),
  switchMap(([{formValues}, state]) => service.getUser(formValues)),
  switchMap((res:User) => {
    // return of(true);
    return service.getUserMovies().pipe(
      map((userMovies: UserMovie[]) => {
        const userState: User = {...res, loggedIn: true, movies: userMovies};
        service.saveState('user', userState);
        return actions.loginRequestSuccess(userState)
      })
    )
  }),
  tap(()=>  history.push('/movies')),
  catchError(err => of(actions.apiError(service.appErrors.loginError))
  )
);

// export const userLogin = (action$: any, state$: any) => action$.pipe (
//   ofType(actions.LOG_IN_REQUEST),
//   withLatestFrom(state$),
//   switchMap(([{formValues}, state]) =>
//     forkJoin(
//       getUser(formValues).pipe(
//         map((res: Movies) => actions.loginRequestSuccess({ ...res }) )
//       ),
//       getUserMovies().pipe(
//         map((res: Genre[]) => { console.log('ressp in user moviesss', res);
//           // saveState('genres', res);
//           return actions.loginRequestSuccess(res)
//         })
//       ),
//     ).pipe(switchMap(action => action), tap(()=> history.push('/movies')))
//   )
// );

export const userLogOut = (action$: any) => action$.pipe (
  ofType(actions.LOG_OUT_REQUEST),
  switchMap(() =>
    service.logOutUser().pipe(
      switchMap((res) => {
        service.saveState('user', null);
        return  [
          actions.logoutRequestSuccess()
        ]
      }),
      tap(()=> history.push('/movies')),
      catchError(err => of(actions.apiError(service.appErrors.apiError) ))
      )
    )
);

export const userSignUp = (action$: any) => action$.pipe (
  ofType(actions.SIGN_UP_REQUEST),
  switchMap(({formValues}) =>
    service.signUpUser(formValues).pipe(
      switchMap((res: any) => {
        return service.getUserMovies().pipe(
          switchMap((movies: UserMovie[]) => {
            const newState = { ...res, movies, loggedIn: true };
            service.saveState('user', newState);
            return [actions.loginRequestSuccess(newState)];
          })
        )
      }),
      tap(() => history.push('/movies')),
      catchError(err => {
        if(err.status === 409) {
          return of(actions.apiError(service.appErrors.userExist));
        }
        return of(actions.apiError(service.appErrors.apiError));
      })
      )
    )
);

export const resetPassword = (action$: any, state$: any) => action$.pipe (
  ofType(actions.RESET_PASSWORD),
  withLatestFrom(state$),
  switchMap(([{formValues}, state ]) =>
    service.resetUserPassword(formValues).pipe(
      switchMap((res: any) => {
        return service.getUserMovies().pipe(
          switchMap((movies: UserMovie[]) => {
          const newState = { ...res, movies, loggedIn: true };
            service.saveState('user', newState);
            return [actions.loginRequestSuccess(newState)];
          })
        )
      }),
      tap(()=> history.push('/movies')),
      catchError(err => {
        if(err.status === 401) {
          return of(actions.apiError(service.appErrors.tokenExpired));
        }
        return of(actions.apiError(service.appErrors.apiError));
      })
      )
    )
);

export const sendPasswordRequest = (action$: any) => action$.pipe (
  ofType(actions.PASSWORD_RESET_REQUEST),
  switchMap(({ formValues }) =>
  service.sendResetRequest(formValues).pipe(
    switchMap(({ message }: {message: string}) => {
      // :TODO, gett the user state and pass the user in the action.
      return [actions.resetPasswordRequestSuccess({ resetMessage: message })];
    }),
    catchError(err => {
      if(err.status === 401) {
        return of(actions.apiError(service.appErrors.emailNotFound));
      }
      return of(actions.apiError(service.appErrors.apiError));
    }))
  )
);
