import css from './Overlay.module.css';
import PropTypes from 'prop-types';

export const Overlay = ({ onClose }) => {
  return <div className={css.overlay} onClick={onClose}></div>;
};

Overlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
