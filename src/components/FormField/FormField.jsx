import MaskedInput from 'react-text-mask';
import css from './FormField.module.css';
import PropTypes from 'prop-types';

// Define the mask array
// prettier-ignore
const phoneMask = ['+', '6', '3', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

export const FormField = ({ label, name, type, formik, icon: Icon }) => {
  const isError = formik.touched[name] && formik.errors[name];

  return (
    <label className={css.formField}>
      <p className={css.formLabel}>{label}</p>
      {type === 'phone' ? (
        <MaskedInput
          mask={phoneMask}
          className={`${css.formInput} ${isError && css.errorInput}`}
          type='text'
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          placeholder='+63 (912) 345 6789'
        />
      ) : (
        <input
          className={`${css.formInput} ${isError && css.errorInput}`}
          type={type}
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
      )}
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
