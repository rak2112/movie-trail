import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { reduxForm } from 'redux-form'
import * as actions from '../../core/actions';
import { FormValues } from '../../core/interfaces';
import * as service from '../../core/utils';
import { ResetPassword } from './dashboard.component';


const onSubmit = (values: any, dispatch: any ) => dispatch(actions.resetPasswordRequest(values));

const mapStateToProps: MapStateToProps <any, any, any>  = (state: any) => {
  const { user } = state;
  return {
    user
  };
};

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'loginFormValidation',
  onSubmit
})(ResetPassword))