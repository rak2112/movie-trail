import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import { Field, InjectedFormProps } from 'redux-form'
import { FormInput } from '../../core/components/form-input';
import { required } from '../../core/components/form-validation';
import { StyledComponent } from '../common/style.component';

export interface LoginProps extends InjectedFormProps{
  email: string;
  password: string;
  submitting: boolean;
  handleSubmit: ()=> void;
};

export type FormProps = {} & InjectedFormProps<LoginProps>

export const LoginComponent: SFC<any> = (props: any) => {
  const { handleSubmit, submitting } = props
  return (
    <StyledComponent>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h3>Log In</h3>
          <Field 
            name="email" 
            type="text"
            component={FormInput} 
            placeholder="User name"
            validate={[ required ]}
          />

          <Field 
            name="password" 
            type="password"
            placeholder="Password"
            component={FormInput}
            validate={[ required ]}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>Log in</button>
        <Link className="btn btn-warning" to={{pathname: '/movies' }}>Cancel</Link>
        <Link className="nav-link" to={{pathname: '/register' }}>Register</Link>
        <Link className="nav-link" to={{pathname: '/password-reset' }}>Forgot Password?</Link>
      </form>
    </StyledComponent>
  );
}