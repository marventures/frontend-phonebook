import { MdOutlineClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { AddForm } from '../AddForm/AddForm';

export const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={css.overlay} onClick={onClose}></div>}

      {/* Modal Content */}
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          <MdOutlineClose />
        </button>
        <AddForm onClose={onClose} />
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
