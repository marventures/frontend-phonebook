import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Filter } from '../../components/Filter/Filter';
import { ContactList } from '../../components/ContactList/ContactList';
import { useAuth } from '../../hooks/useAuth';

const ContactsPage = () => {
  const { user } = useAuth();
  return (
    <HelmetProvider>
      <Helmet>
        <title>Phonebook</title>
      </Helmet>
      <h2>{`Welcome ${user.firstName}`}!</h2>
      <br />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </HelmetProvider>
  );
};

export default ContactsPage;
