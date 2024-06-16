import * as Yup from 'yup';

const signupValidation = Yup.object({
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

const loginValidation = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export { signupValidation, loginValidation };
