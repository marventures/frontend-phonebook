import { MdOutlineClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ isOpen, onClose, component: ModalContent, modalTitle }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={css.overlay} onClick={onClose}></div>}

      {/* Modal */}
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          <MdOutlineClose />
        </button>
        {/* Content */}
        <h2 className={css.modalTitle}>{modalTitle}</h2>
        <ModalContent onClose={onClose} />
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  component: PropTypes.elementType.isRequired,
  modalTitle: PropTypes.string.isRequired,
};
