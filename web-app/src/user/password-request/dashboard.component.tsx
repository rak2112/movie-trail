import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form'
import { formInput, required } from '../../core/components';
import { StyledComponent } from '../index';

export const ResetPassword = (props: any) => {
  const { handleSubmit, pristine, reset, submitting, location, user } = props
  const signingUp = (/^\/register/gi).test(location.pathname);
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
              component={formInput} 
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