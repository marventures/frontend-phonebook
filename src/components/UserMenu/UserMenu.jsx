import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/authOperations';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../Button/Button';
import PropTypes from 'prop-types';
import css from './UserMenu.module.css';
import { Link } from 'react-router-dom';

export const UserMenu = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logOut());
    onClose();
  };

  return (
    <div className={css.wrapper}>
      <div className={css.userDetails}>
        <p className={css.userName}>
          {user.firstName} {user.lastName}
        </p>
        <p className={css.userEmail}>{user.email}</p>
      </div>

      <Link to='/profile' className={css.link} onClick={onClose}>
        Profile
      </Link>
      <Button className={css.logoutButton} type='button' toggle={handleLogout} name='Logout'>
        Logout
      </Button>
    </div>
  );
};

UserMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};
