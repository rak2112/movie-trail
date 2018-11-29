import { ofType } from "redux-observable";
import { forkJoin } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import * as actions from '../actions';
import { User, UserMovie } from '../interfaces';
import { history } from '../routes';
import * as service from '../utils';

export const userLogin = (action$: any, state$: any) => action$.pipe (
  ofType(actions.LOG_IN_REQUEST),
  withLatestFrom(state$),
  switchMap(([{formValues}, state]) =>
    service.getUser(formValues) ),
    switchMap((res: User) => {
      return service.getUserMovies().pipe(
        switchMap((movies: UserMovie[]) => {
          const newState = { ...res, movies };
          service.saveState('user', newState);
          return [actions.loginRequestSuccess(newState)];
        })
      )
    // saveState('user', res);
    // return  [
    //   actions.loginRequestSuccess(res)
    // ]
  }),
  tap(()=> history.push('/movies')),
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
      switchMap((res: any) => { console.log('ress from server', res);
        return service.getUserMovies().pipe(
          switchMap((movies: UserMovie[]) => { console.log('usserrrr movies if loging', movies)
            const newState = { ...res, movies };
            service.saveState('user', newState);
            return [actions.loginRequestSuccess(newState)];
          })
        )
      }),
      tap(()=> history.push('/movies')),
      catchError(err => { console.log('errr', err);
        if(err.status === 409) {
          return of(actions.apiError(service.appErrors.userExist));
        }
        return of(actions.apiError(service.appErrors.apiError));
      })
      )
    )
);

export const resetPassword = (action$: any) => action$.pipe (
  ofType(actions.PASSWORD_RESET_REQUEST),
  switchMap(({formValues}) =>
  service.resetUserPassword(formValues).pipe(
      switchMap((res: any) => { console.log('ress from server', res);
        // return getUserMovies().pipe(
        //   switchMap((movies: UserMovie[]) => { console.log('usserrrr movies if loging', movies)
        //     const newState = { ...res, movies };
        //     saveState('user', newState);
        //     return [actions.loginRequestSuccess(newState)];
        //   })
        // )
        return [];
      }),
      // tap(()=> history.push('/movies')),
      catchError(err => { console.log('errr', err);
        if(err.status === 401) {
          return of(actions.apiError(service.appErrors.tokenExpired));
        }
        return of(actions.apiError(service.appErrors.apiError));
      })
      )
    )
);