import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../../redux/contacts/contactsOperation';
import { useToggle } from '../../../hooks/useToggle';
import { Modal } from '../../Modal/Modal';
import { EditForm } from '../../EditForm/EditForm';

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
      <button className={`${css.editButton} ${isOpen && css.visuallyHidden}`} onClick={toggle}>
        Edit Contact
      </button>
      <button onClick={handleDelete}>Delete</button>
      <Modal isOpen={isOpen} onClose={toggle} component={EditForm} modalTitle='Edit a Contact' />
    </li>
  );
};

ContactListItem.propTypes = {
  filteredContact: PropTypes.object.isRequired,
};
