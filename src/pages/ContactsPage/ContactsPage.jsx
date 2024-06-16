import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Filter } from '../../components/Filter/Filter';
import { ContactList } from '../../components/ContactList/ContactList';

const ContactsPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Phonebook</title>
      </Helmet>
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </HelmetProvider>
  );
};

export default ContactsPage;
