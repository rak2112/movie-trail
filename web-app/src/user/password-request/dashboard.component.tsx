import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import { Field, InjectedFormProps } from 'redux-form'
import { FormInput } from '../../core/components/form-input';
import { required } from '../../core/components/form-validation';
import { User } from '../../core/interfaces';
import { StyledComponent } from '../common/style.component';

export interface Props extends InjectedFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  submitting: boolean;
  token: string;
  user: User;
  handleSubmit: ()=> void;
};

export const ResetPassword = (props: Props) => {
  const { handleSubmit, submitting, user } = props
  return (
    <>
      {
        user && user.resetMessage &&
        <div style={{margin:0, fontSize: '1.8rem', textAlign: 'center'}} className="alert alert-success" role="alert">
          {user.resetMessage}
        </div>
      }
      <StyledComponent>
        <form onSubmit={ handleSubmit }>
          <div className="form-group">
            <h3>Reset your password</h3>
            <Field 
              name="email" 
              type="text"
              component={FormInput} 
              placeholder="User name / email"
              validate={[ required ]}
            />

          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            Reset password
          </button>
          <Link className="btn btn-warning" to={{pathname: '/movies' }}>Cancel</Link>
        </form>
      </StyledComponent>
    </>
  )
}