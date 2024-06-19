import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { Overlay } from '../Overlay/Overlay';
import { CloseIcon } from '../CloseIcon/CloseIcon';

export const Modal = ({
  isOpen,
  onClose,
  component: ModalContent,
  modalTitle,
  filteredContact,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && <Overlay onClose={onClose} />}

      {/* Modal */}
      <div className={css.modal}>
        <CloseIcon onClose={onClose} />
        {/* Content */}
        <h2 className={css.modalTitle}>{modalTitle}</h2>
        {/* component either AddForm or EditForm (check render of Modal)*/}
        <ModalContent onClose={onClose} filteredContact={filteredContact} />
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  component: PropTypes.elementType.isRequired,
  modalTitle: PropTypes.string.isRequired,
  filteredContact: PropTypes.object,
};
