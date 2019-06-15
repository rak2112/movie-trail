import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import { Field, InjectedFormProps } from 'redux-form'
import { FormInput } from '../../core/components/form-input';
import { required } from '../../core/components/form-validation';
import { StyledComponent } from '../common/style.component';

interface Location {
  pathname: string;
};

export interface Props extends InjectedFormProps{
  email: string;
  password: string;
  confirmPassword: string;
  submitting: boolean;
  token: string;
  location: Location;
  handleSubmit: ()=> void;
};

export type SignUpProps = {} & InjectedFormProps<Props>

export const SignUpComponent: SFC<any> = (props: any) => {
  const { handleSubmit, submitting, location } = props;
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
              component={FormInput} 
              placeholder="email"
              validate={[ required ]}
            />
          }

          {
            signingUp && <Field 
              name="name" 
              type="text"
              component={FormInput} 
              placeholder="name"
              validate={[ required ]}
            />
          }

          <Field 
            name="password" 
            type="password"
            placeholder="Password"
            component={FormInput}
            validate={[ required ]}
          />

          <Field 
            name="confirmPassword"
            type="password"
            placeholder="Re type Password"
            component={FormInput}
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