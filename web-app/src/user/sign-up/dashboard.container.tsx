import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { reduxForm } from 'redux-form'
import * as actions from '../../core/actions';
import { FormValues } from '../../core/interfaces';
import * as service from '../../core/utils';
import { SignUpComponent } from './dashboard.component';


const onSubmit = (values: any, dispatch: any, { match: { params: { token }, url } }: any) => {
  const { password, confirmPassword } = values;
  const signingUp = (/^\/register/gi).test(url);

  if (password !== confirmPassword) {
    return dispatch(actions.apiError(service.appErrors.passwordMatch));
  }

  if(signingUp) {
    return dispatch(actions.signUpRequest(values));
  }

  return dispatch(actions.resetPassword({...values, token}));
  
};

export default reduxForm<any>({
  form: 'loginFormValidation',
  onSubmit
}) (SignUpComponent);
