import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    dispatch(
      register({
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete='off'>
      <label className={css.label}>
        First Name
        <input type='text' name='firstName' />
      </label>
      <label className={css.label}>
        Last Name
        <input type='text' name='lastName' />
      </label>
      <label className={css.label}>
        Email
        <input type='email' name='email' />
      </label>
      <label className={css.label}>
        Password
        <input type='password' name='password' />
      </label>
      <button type='submit'>Register</button>
    </form>
  );
};
