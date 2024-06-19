import css from './Sidebar.module.css';
import PropTypes from 'prop-types';
import { Overlay } from '../Overlay/Overlay';
import { CloseIcon } from '../CloseIcon/CloseIcon';
import { UserMenu } from '../UserMenu/UserMenu';

export const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <Overlay onClose={onClose} />}

      <div className={`${css.sidebar} ${isOpen ? css.open : ''}`}>
        {/* Close Button */}
        <CloseIcon onClose={onClose} />

        {/* Sidebar Links */}
        <UserMenu onClose={onClose} />
      </div>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
