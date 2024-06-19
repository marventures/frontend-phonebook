import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/authOperations';
import { useAuth } from '../../hooks/useAuth';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className={css.wrapper}>
      <p className={css.userDetails}>
        Name: {user.firstName} {user.lastName}
      </p>
      <p className={css.userDetails}>Email:{user.email}</p>
      <p className={css.userDetails}>Subscription: {user.subscription}</p>
      <button type='button' onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
};
