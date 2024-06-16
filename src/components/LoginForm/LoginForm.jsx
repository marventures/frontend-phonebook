import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { logIn } from '../../redux/auth/authOperations';
import css from './LoginForm.module.css';
import { loginValidation } from '../../validations/yupValidation';

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
      <label className={css.label} htmlFor='email'>
        Email
        <input
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className={css.error}>{formik.errors.email}</div>
        )}
      </label>
      <label className={css.label} htmlFor='password'>
        Password
        <input
          id='password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div className={css.error}>{formik.errors.password}</div>
        )}
      </label>
      <button type='submit'>Log In</button>
    </form>
  );
};
