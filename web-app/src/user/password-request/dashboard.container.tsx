import { connect, MapStateToProps } from 'react-redux';
import { reduxForm } from 'redux-form'
import * as actions from '../../core/actions';
import { FormValues } from '../../core/interfaces';
import { State } from '../../core/reducers/index';
import { Props, ResetPassword } from './dashboard.component';


const onSubmit = (values: FormValues, dispatch: (fn: any)=>void ) => dispatch(actions.resetPasswordRequest(values));

const mapStateToProps: MapStateToProps <any, any, any>  = (state: State) => {
  const { user } = state;
  return {
    user
  };
};

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'loginFormValidation',
  onSubmit
})(ResetPassword));