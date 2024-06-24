import { useMemo } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { editUser } from '../../redux/auth/authOperations';
import css from './ProfileForm.module.css';
import { profileValidation } from '../../validations/yupValidation';
import { Button } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { FcPortraitMode, FcInvite } from 'react-icons/fc';
import { useAuth } from '../../hooks/useAuth';

export const ProfileForm = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    validationSchema: profileValidation,
    onSubmit: values => {
      dispatch(editUser({ ...values }));
      formik.resetForm();
    },
  });

  const isFormUnchanged = useMemo(
    () =>
      formik.values.firstName === formik.initialValues.firstName &&
      formik.values.lastName === formik.initialValues.lastName &&
      formik.values.email === formik.initialValues.email,
    [formik.values, formik.initialValues]
  );

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
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
