import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../../redux/contacts/contactsOperation';
import { useToggle } from '../../../hooks/useToggle';
import { Modal } from '../../Modal/Modal';
import { EditForm } from '../../EditForm/EditForm';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';

export const ContactListItem = ({ filteredContact }) => {
  const dispatch = useDispatch();
  const { isOpen, toggle } = useToggle(false);

  // handleDelete method
  const handleDelete = () => {
    dispatch(deleteContact(filteredContact._id));
  };

  return (
    <li className={css.contactListItem}>
      <p>{filteredContact.name}:</p>
      <p>{filteredContact.phone}</p>
      <p>{filteredContact.email}</p>
      <FaUserEdit
        className={`${css.editButton} ${isOpen && css.visuallyHidden}`}
        onClick={toggle}
      />
      <FaTrashAlt
        className={`${css.deleteButton} ${isOpen && css.visuallyHidden}`}
        onClick={handleDelete}
      />
      <Modal
        isOpen={isOpen}
        onClose={toggle}
        component={EditForm}
        modalTitle='Edit a Contact'
        filteredContact={filteredContact}
      />
    </li>
  );
};

ContactListItem.propTypes = {
  filteredContact: PropTypes.object.isRequired,
};
