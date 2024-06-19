import { MdOutlineClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import css from './CloseIcon.module.css';

export const CloseIcon = ({ onClose }) => {
  return (
    <button className={css.closeButton} onClick={onClose}>
      <MdOutlineClose />
    </button>
  );
};

CloseIcon.propTypes = {
  onClose: PropTypes.func.isRequired,
};
