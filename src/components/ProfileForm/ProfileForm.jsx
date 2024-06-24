import { useMemo } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { editUser } from '../../redux/auth/authOperations';
import css from './ProfileForm.module.css';
import { profileValidation } from '../../validations/yupValidation';
import { Button } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { FcPortraitMode, FcInvite } from 'react-icons/fc';

export const ProfileForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      avatar: null,
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: profileValidation,
    onSubmit: values => {
      const { avatar, firstName, lastName, email } = values;
      dispatch(editUser({ avatar, firstName, lastName, email }));

      formik.resetForm();
    },
  });

  const isFormUnchanged = useMemo(
    () =>
      formik.values.avatar === null &&
      formik.values.firstName === '' &&
      formik.values.lastName === '' &&
      formik.values.email === '',
    [formik.values]
  );

  // Function to handle avatar selection
  const handleAvatarChange = event => {
    formik.setFieldValue('avatar', event.currentTarget.files[0]);
  };

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <FormField
        label='Change Profile Picture:'
        name='avatar'
        type='file'
        formik={formik}
        icon={FcPortraitMode}
        handleAvatarChange={handleAvatarChange}
      />
      <FormField
        label='First Name'
        name='firstName'
        type='text'
        formik={formik}
        icon={FcPortraitMode}
      />
      <FormField
        label='Last Name'
        name='lastName'
        type='text'
        formik={formik}
        icon={FcPortraitMode}
      />
      <FormField label='Email' name='email' type='email' formik={formik} icon={FcInvite} />

      <Button
        className={isFormUnchanged ? `${css.saveButton} ${css.disabled}` : css.saveButton}
        name='Save'
        type='submit'
        disabled={isFormUnchanged}
      />
    </form>
  );
};
