import { ajax } from 'rxjs/ajax';

import { Observable }  from 'rxjs';

import { Store } from 'redux';
import { finalize } from 'rxjs/operators';
import * as actions from '../actions';


export interface GetRequestOptions {
  cache?: boolean;
  headers?: any;
  observe?: 'body';
  params?: any;
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface PostRequestOptions {
  headers?: any;
  observe?: 'body';
  params?: any;
  responseType?: 'events';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export type RequestOptions = GetRequestOptions | PostRequestOptions;

export class HttpBackend {
  store: Store;
  constructor (store: Store) {
    this.store = store;
  }

  handleRequest(options: RequestOptions) {
    this.store.dispatch(actions.apiRequest());
  }

  handleResponse() {
    return (source$: Observable<any>) => source$.pipe(
      finalize(() => {
        this.store.dispatch(actions.apiResponse());
      })
    );
  }

  getJSON(options: any, headers?: {}): Observable<any>{
    this.handleRequest(options);
    return ajax.getJSON(options, headers).pipe(this.handleResponse());
  }

  post(options: any, headers?: {}): Observable<any>{
    this.handleRequest(options);
    return ajax.post(options, headers).pipe(this.handleResponse());
  }  
};

export function httpFactory (store: Store) {
  return new HttpBackend(store);
}