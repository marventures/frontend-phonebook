import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { logIn } from '../../redux/auth/authOperations';
import css from './LoginForm.module.css';
import { loginValidation } from '../../validations/yupValidation';
import { FormField } from '../FormField/FormField';
import { FcPrivacy, FcInvite } from 'react-icons/fc';
import { Button } from '../Button/Button';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: values => {
      dispatch(logIn(values));
      formik.resetForm();
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <h3 className={css.formTitle}>Login</h3>
      {/* prettier-ignore */}
      <>
      <FormField label='Email' name='email' type='email' formik={formik} icon={FcInvite } />
      <FormField label='Password' name='password' type='password' formik={formik} icon={FcPrivacy } />
      </>

      <Button className={css.loginButton} name='Log In' type='submit' />
    </form>
  );
};
