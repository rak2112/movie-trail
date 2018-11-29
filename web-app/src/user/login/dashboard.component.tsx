import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form'
import { formInput, required } from '../../core/components';
import { StyledComponent } from '../index';

export const LoginComponent = (props: any) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <StyledComponent>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h3>Log In</h3>
          <Field 
            name="username" 
            type="text"
            component={formInput} 
            placeholder="User name"
            validate={[ required ]}
          />

          <Field 
            name="password" 
            type="password"
            placeholder="Password"
            component={formInput}
            validate={[ required ]}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>Log in</button>
        <Link className="btn btn-warning" to={{pathname: '/movies' }}>Cancel</Link>
        <Link className="nav-link" to={{pathname: '/register' }}>Register</Link>
        <a className="nav-link" >Forgot Password?</a>
      </form>
    </StyledComponent>
  )
}