import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/authOperations';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../Button/Button';
import PropTypes from 'prop-types';
import css from './UserMenu.module.css';

export const UserMenu = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logOut());
    onClose();
  };

  return (
    <div className={css.wrapper}>
      <p className={css.userDetails}>
        Name: {user.firstName} {user.lastName}
      </p>
      <p className={css.userDetails}>Email:{user.email}</p>
      <p className={css.userDetails}>Subscription: {user.subscription}</p>
      <Button className={css.logoutButton} type='button' onClick={handleLogout} name='Logout'>
        Logout
      </Button>
    </div>
  );
};

UserMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};
