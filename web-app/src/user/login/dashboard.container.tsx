import { reduxForm } from 'redux-form'
import { loginRequest } from '../../core/actions';
import { FormValues } from '../../core/interfaces';
import { LoginComponent, LoginProps } from './dashboard.component';


const onSubmit = (values: FormValues, dispatch: (fn: any) => void) => dispatch(loginRequest(values));

export default reduxForm<LoginProps>({
  form: 'loginFormValidation',
  onSubmit
}) (LoginComponent);
