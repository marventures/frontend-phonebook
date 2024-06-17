import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { editContact } from '../../redux/contacts/contactsOperation';
import { selectContacts } from '../../redux/contacts/contactsSelector';
import css from './EditForm.module.css';
import { contactValidation } from '../../validations/yupValidation';
import toast from 'react-hot-toast';
import { Button } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { FcPortraitMode, FcInvite, FcCallback } from 'react-icons/fc';
import PropTypes from 'prop-types';

export const EditForm = ({ onClose, filteredContact }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const formik = useFormik({
    initialValues: {
      name: filteredContact.name,
      phone: filteredContact.phone,
      email: filteredContact.email,
    },
    validationSchema: contactValidation,
    onSubmit: values => {
      const existingContact = contacts.find(
        contact =>
          contact.name.toLowerCase() === values.name.toLowerCase() &&
          contact._id !== filteredContact._id
      );

      if (existingContact) {
        toast.error(`${values.name} is already in contacts!`);
      } else {
        toast.success(`${values.name} is successfully edited in your contacts!`);
        dispatch(editContact({ contactId: filteredContact._id, ...values }));
        formik.resetForm();
        onClose();
      }
    },
  });

  const isFormUnchanged = useMemo(
    () =>
      formik.values.name === formik.initialValues.name &&
      formik.values.phone === formik.initialValues.phone &&
      formik.values.email === formik.initialValues.email,
    [formik.values, formik.initialValues]
  );

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <FormField label='Name' name='name' type='text' formik={formik} icon={FcPortraitMode} />
      <FormField label='Phone' name='phone' type='phone' formik={formik} icon={FcCallback} />
      <FormField label='Email' name='email' type='email' formik={formik} icon={FcInvite} />
      <Button
        className={isFormUnchanged ? `${css.editButton} ${css.disabled}` : css.editButton}
        name='Edit'
        type='submit'
        disabled={isFormUnchanged}
      />
    </form>
  );
};

EditForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  filteredContact: PropTypes.object.isRequired,
};
