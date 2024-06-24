import css from './Dropdown.module.css';
import PropTypes from 'prop-types';
import { Overlay } from '../Overlay/Overlay';
import { CloseIcon } from '../CloseIcon/CloseIcon';
import { UserMenu } from '../UserMenu/UserMenu';

export const Dropdown = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <Overlay onClose={onClose} />}

      <div className={`${css.dropdown} ${isOpen ? css.open : ''}`}>
        {/* Close Button */}
        <CloseIcon onClose={onClose} />

        {/* Dropdown Links */}
        <UserMenu onClose={onClose} />
      </div>
    </>
  );
};

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
