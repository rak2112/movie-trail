import { reduxForm } from 'redux-form'
import * as actions from '../../core/actions';
import { FormValues } from '../../core/interfaces/index';
import * as service from '../../core/utils/util-service';
import { Props, SignUpComponent } from './dashboard.component';


const onSubmit = (values: FormValues, dispatch: (fn: any)=>void, { match: { params: { token }, url } }: any) => {
  const { password, confirmPassword } = values;
  const signingUp = (/^\/register/gi).test(url);

  if (password !== confirmPassword) {
    return dispatch(actions.apiError(service.appErrors.passwordMatch));
  }

  if(signingUp) {
    return dispatch(actions.signUpRequest(values));
  }

  return dispatch(actions.resetPassword({...values, token}));
  
};

export default reduxForm<any>({
  form: 'loginFormValidation',
  onSubmit
}) (SignUpComponent);
