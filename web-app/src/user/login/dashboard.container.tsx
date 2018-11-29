import React from 'react';
// import { connect, MapStateToProps } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { getMovieGenres } from 'src/core/selectors';
import { loginRequest } from '../../core/actions';
import { FormValues } from '../../core/interfaces';
import { LoginComponent } from './dashboard.component';


const onSubmit = (values: FormValues, dispatch: any) => {
  return dispatch(loginRequest(values))
};

export default reduxForm<any>({
  form: 'loginFormValidation',
  onSubmit
}) (LoginComponent);