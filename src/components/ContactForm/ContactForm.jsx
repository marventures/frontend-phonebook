import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { addContact } from '../../redux/contacts/contactsOperation';
import { selectContacts } from '../../redux/contacts/contactsSelector';
import css from './ContactForm.module.css';
import { contactValidation } from '../../validations/yupValidation';
import toast from 'react-hot-toast';
import { Button } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { FcPortraitMode, FcInvite } from 'react-icons/fc';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validationSchema: contactValidation,
    onSubmit: values => {
      const existingContact = contacts.find(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      );
      if (existingContact) {
        toast.error(`${values.name} is already in contacts!`);
      } else {
        toast.success(`${values.name} is successfully added in your contacts!`);
        dispatch(addContact(values));
        formik.resetForm();
      }
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <h2 className={css.formTitle}>Edit Contact</h2>
      <FormField label='Name' name='name' type='text' formik={formik} icon={FcPortraitMode} />
      <FormField label='Phone' name='phone' type='phone' formik={formik} icon={FcPortraitMode} />
      <FormField label='Email' name='email' type='email' formik={formik} icon={FcInvite} />
      <Button name='Edit Contact' type='submit' />
    </form>
  );
};
