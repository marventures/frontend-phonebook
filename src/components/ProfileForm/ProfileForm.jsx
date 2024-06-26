import { useMemo, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../redux/auth/authOperations';
import css from './ProfileForm.module.css';
import { profileValidation } from '../../validations/yupValidation';
import { Button } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { FcPortraitMode, FcInvite } from 'react-icons/fc';
import { useAuth } from '../../hooks/useAuth';
import { selectIsLoading } from '../../redux/auth/authSelectors';
import { Loader } from '../Loader/Loader';

export const ProfileForm = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  // Initialize formik only when user data is available
  const formik = useFormik({
    initialValues: {
      avatar: null,
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: profileValidation,
    onSubmit: values => {
      dispatch(editUser({ ...values }));
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        avatar: null,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Update formik values when user data changes

  const isFormUnchanged = useMemo(
    () =>
      formik.values.avatar === null &&
      formik.values.firstName === user.firstName &&
      formik.values.lastName === user.lastName &&
      formik.values.email === user.email,
    [formik.values, user]
  );

  const handleAvatarChange = event => {
    formik.setFieldValue('avatar', event.currentTarget.files[0]);
  };

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      {isLoading ? (
        <Loader className={css.loader} />
      ) : (
        <>
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
        </>
      )}
    </form>
  );
};
