import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { reduxForm } from 'redux-form'
import * as actions from '../../core/actions';
import { FormValues } from '../../core/interfaces';
import { SignUpComponent } from './dashboard.component';


const onSubmit = (values: any, dispatch: any, { match: { params: { token }, url } }: any) => {
  const { password, confirmPassword } = values;
  const signingUp = (/^\/register/gi).test(url); console.log('signingUp', signingUp, 'url', url);
  if (password !== confirmPassword) {
    return dispatch(actions.apiError('Password not match, Please type again!'));
  }

  if(signingUp) {
    return dispatch(actions.signUpRequest(values));
  }

  return dispatch(actions.resetPasswordRequest({...values, token}));
  
};

export default reduxForm<any>({
  form: 'loginFormValidation',
  onSubmit
}) (SignUpComponent);

const mapStateToProps: MapStateToProps <any, any, any>  = (state: any) => {
  console.log('contianer movies--->', state);
  // const { movies, api } = state;
  // return {
  //   api
  // }
};

// export default connect(mapStateToProps, actions)(reduxForm({
//   form: 'loginFormValidation',
//   onSubmit
// })(SignUpComponent))