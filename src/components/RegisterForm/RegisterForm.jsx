import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import { useFormik } from 'formik';
import { signupValidation } from '../../validations/yupValidation';
import css from './RegisterForm.module.css';

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
      <label className={css.label}>
        First Name
        <input
          type='text'
          name='firstName'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className={css.error}>{formik.errors.firstName}</div>
        ) : null}
      </label>
      <label className={css.label}>
        Last Name
        <input
          type='text'
          name='lastName'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className={css.error}>{formik.errors.lastName}</div>
        ) : null}
      </label>
      <label className={css.label}>
        Email
        <input
          type='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={css.error}>{formik.errors.email}</div>
        ) : null}
      </label>
      <label className={css.label}>
        Password
        <input
          type='password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={css.error}>{formik.errors.password}</div>
        ) : null}
      </label>
      <button type='submit'>Register</button>
    </form>
  );
};
