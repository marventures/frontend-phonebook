import css from './FormField.module.css';
import PropTypes from 'prop-types';

export const FormField = ({ label, name, type, formik, icon: Icon }) => {
  return (
    <label className={css.formField}>
      <p className={css.formLabel}>{label}</p>
      <input
        className={`${css.formInput} ${
          formik.touched[name] && formik.errors[name] && css.errorInput
        }`}
        type={type}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
      />
      <Icon className={css.formIcon} />
      {formik.touched[name] && formik.errors[name] && (
        <div className={css.error}>{formik.errors[name]}</div>
      )}
    </label>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  icon: PropTypes.func.isRequired,
};
