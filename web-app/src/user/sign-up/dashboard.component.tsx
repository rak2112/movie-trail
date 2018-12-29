import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form'
import { formInput, required } from '../../core/components';
import { StyledComponent } from '../index';

export const SignUpComponent = (props: any) => {
  const { handleSubmit, pristine, reset, submitting, location } = props
  const signingUp = (/^\/register/gi).test(location.pathname);
  return (
    <StyledComponent>
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          {
            signingUp ? <h3>Register</h3>
            : <h3>Reset your password</h3>
          }
          {
            signingUp && <Field 
              name="email" 
              type="text"
              component={formInput} 
              placeholder="email"
              validate={[ required ]}
            />
          }

          {
            signingUp && <Field 
              name="name" 
              type="text"
              component={formInput} 
              placeholder="name"
              validate={[ required ]}
            />
          }

          <Field 
            name="password" 
            type="password"
            placeholder="Password"
            component={formInput}
            validate={[ required ]}
          />

          <Field 
            name="confirmPassword"
            type="password"
            placeholder="Re type Password"
            component={formInput}
            validate={[ required ]}
          />

        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          { (signingUp) ? `Sign up` : `Change password`}
        </button>
        <Link className="btn btn-warning" to={{ pathname: '/movies' }}>Cancel</Link>
      </form>
    </StyledComponent>
  )
}