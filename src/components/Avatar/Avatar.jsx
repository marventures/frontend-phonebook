import css from './Avatar.module.css';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';

export const Avatar = ({ toggle }) => {
  const { user } = useAuth();

  return <img className={`${css.userIcon}`} src={user.avatarURL} onClick={toggle} />;
};

Avatar.propTypes = {
  toggle: PropTypes.func.isRequired,
};
