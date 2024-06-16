import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { addContact } from '../../redux/contacts/contactsOperation';
import { selectContacts } from '../../redux/contacts/contactsSelector';
import css from './ContactForm.module.css';
import { contactValidation } from '../../validations/yupValidation';
import toast from 'react-hot-toast';

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
      <label className={css.formField}>
        <p className={css.formLabel}>Name</p>
        <input
          type='text'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.name && formik.errors.name && (
          <div className={css.error}>{formik.errors.name}</div>
        )}
      </label>

      <label className={css.formField}>
        <p className={css.formLabel}>Phone</p>
        <input
          type='tel'
          name='phone'
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className={css.error}>{formik.errors.phone}</div>
        )}
      </label>

      <label className={css.formField}>
        <p className={css.formLabel}>Email</p>
        <input
          type='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.email && formik.errors.email && (
          <div className={css.error}>{formik.errors.email}</div>
        )}
      </label>

      <button className={css.formButton} type='submit'>
        Add Contact
      </button>
    </form>
  );
};
