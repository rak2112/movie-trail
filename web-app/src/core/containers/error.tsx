
import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { LoadError } from '../../core/components';
import { Api } from '../../core/interfaces';

interface Props {
  api: Api
};
const Error = ({ api }: Props) => <LoadError {...api}/>

const mapStateToProps: MapStateToProps <any, any, any> = (state) => {
  const { api } = state;
  return {
    api
  }
};

export default connect(mapStateToProps)(Error);
