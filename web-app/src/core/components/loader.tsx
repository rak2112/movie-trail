import React from 'react';

export const Loader = () => {
  return (
    <div className="alert alert-info" role="alert">
      <i className="glyphicon glyphicon-repeat gly-spin"/>
      <span>This may take a moment, please wait.</span>
    </div>
  );
};