import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for schema validation
import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  // Define Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'First name must only contain alphabet letters')
      .required('First name is required'),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Last name must only contain alphabet letters')
      .required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .max(16, 'Password cannot be longer than 16 characters')
      .required('Password is required'),
  });

  // Formik hook to handle form values, validation, submission, and error messages
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(register(values));
      resetForm();
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit} autoComplete='off'>
      <label className={css.label}>
        First Name
        <input
          type='text'
          name='firstName'
          onChange={formik.handleChange}
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
