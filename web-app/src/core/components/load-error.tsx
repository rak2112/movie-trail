import React from 'react';
import { Api } from '../interfaces';

export const LoadError = ({hasError, errorMessage}: Api) => (
  <>
  {
    hasError && 
    <div style={{margin:0, fontSize: '1.8rem', textAlign: 'center'}} className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  }
  </>
);
