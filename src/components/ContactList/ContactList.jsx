import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// prettier-ignore
import { selectFilteredContacts, selectError, selectIsLoading } from '../../redux/contacts/contactsSelector';
import { fetchContacts } from '../../redux/contacts/contactsOperation';
import { ContactListItem } from './ContactListItem/ContactListItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { useToggle } from '../../hooks/useToggle';
import { Modal } from '../Modal/Modal';
import css from './ContactList.module.css';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const { isOpen, toggle } = useToggle(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {/* if loading and not error, show Loader */}
      {isLoading && !error && <Loader />}

      {/* if not loading, not error and filtered contacts is empty, show warning */}
      {!isLoading && !error && filteredContacts.length === 0 && (
        <p>The Phonebook is empty. Please add a contact</p>
      )}

      <Button className={css.addButton} type='button' name='Add Contact' onClick={toggle} />
      <Modal isOpen={isOpen} onClose={toggle} />

      {/* if not loading, not error and have atleast 1 filtered contact, show ContactListItem */}
      {!isLoading &&
        !error &&
        filteredContacts.length > 0 &&
        filteredContacts.map(filteredContact => (
          <ContactListItem key={filteredContact._id} filteredContact={filteredContact} />
        ))}
    </ul>
  );
};
