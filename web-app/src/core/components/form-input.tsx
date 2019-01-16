import React from 'react';

export const FormInput = ({ input, label, type, placeholder, meta: { touched, error, warning } }: any) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder || label} type={type} className={`form-control ${(touched && error) ? 'error' : ''}`}/>
      <em>
        { touched && ((error && <span>{ error }</span>) || (warning && <span>{ warning }</span>)) }
      </em>
      
    </div>
  </div>
);