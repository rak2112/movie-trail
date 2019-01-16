import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form'
import { FormInput, required } from '../../core/components';
import { StyledComponent } from '../index';

export const LoginComponent = (props: any) => {
  const { handleSubmit, pristine, reset, submitting } = props
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
  )
}