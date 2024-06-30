import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contactsOperation';
import { Button } from '../Button/Button';
import PropTypes from 'prop-types';
import css from './DeleteForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../FormField/FormField';
import { FcPortraitMode } from 'react-icons/fc';
import toast from 'react-hot-toast';

export const DeleteForm = ({ onClose, filteredContact }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .oneOf([filteredContact.name], 'Name does not match')
        .required('Name is required'),
    }),
    onSubmit: values => {
      if (values.name === filteredContact.name) {
        dispatch(deleteContact(filteredContact._id));
        toast.success(`${values.name} is successfully deleted in your contacts!`);
        onClose();
      }
    },
  });

  return (
    <div>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <div className={css.confirmDetails}>
          <p>
            {`All contact information about `}
            <span className={css.confirmName}>{filteredContact.name}</span>
            {` will be deleted.`}
          </p>
          <p>Are you sure you wish to proceed?</p>
        </div>

        <FormField
          label={`Type "${filteredContact.name}" to confirm your action`}
          name='name'
          type='text'
          formik={formik}
          icon={FcPortraitMode}
        />

        <div className={css.buttonContainer}>
          <Button className={css.cancelButton} toggle={onClose} name='Cancel' type='button'>
            Cancel
          </Button>
          <Button
            className={css.deleteButton}
            type='submit'
            name='Delete'
            disabled={!formik.isValid}
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
};

DeleteForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  filteredContact: PropTypes.object.isRequired,
};
