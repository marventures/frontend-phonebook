import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import { useFormik } from 'formik';
import { signupValidation } from '../../validations/yupValidation';
import { FcPortraitMode, FcPrivacy, FcInvite } from 'react-icons/fc';
import css from './RegisterForm.module.css';

import { FormField } from '../FormField/FormField';
import { Button } from '../Button/Button';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: signupValidation,
    onSubmit: values => {
      dispatch(register(values));
      formik.resetForm();
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <h3 className={css.formTitle}>Registration</h3>

      {/* prettier-ignore */}
      <>
      <FormField label='First Name' name='firstName' type='text' formik={formik} icon={FcPortraitMode } />
      <FormField label='Last Name' name='lastName' type='text' formik={formik} icon={FcPortraitMode } />
      <FormField label='Email' name='email' type='email' formik={formik} icon={FcInvite } />
      <FormField label='Password' name='password' type='password' formik={formik} icon={FcPrivacy } />
      </>

      <Button name='Sign Up' type='submit' />
    </form>
  );
};
