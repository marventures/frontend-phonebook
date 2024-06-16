import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
// import { editContact } from '../../redux/contacts/contactsOperation';
import { selectContacts } from '../../redux/contacts/contactsSelector';
import css from './EditForm.module.css';
import { contactValidation } from '../../validations/yupValidation';
import toast from 'react-hot-toast';
import { Button } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { FcPortraitMode, FcInvite, FcCallback } from 'react-icons/fc';
import PropTypes from 'prop-types';

export const EditForm = ({ onClose }) => {
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
        toast.success(`${values.name} is successfully edited in your contacts!`);
        // dispatch(editContact(values));
        formik.resetForm();
        onClose();
      }
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <FormField label='Name' name='name' type='text' formik={formik} icon={FcPortraitMode} />
      <FormField label='Phone' name='phone' type='phone' formik={formik} icon={FcCallback} />
      <FormField label='Email' name='email' type='email' formik={formik} icon={FcInvite} />
      <Button className={css.editButton} name='Edit' type='submit' />
    </form>
  );
};

EditForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
