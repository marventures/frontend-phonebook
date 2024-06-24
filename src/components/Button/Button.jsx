import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ name, type, toggle, className, disabled }) => {
  return (
    <button
      className={`${css.button} ${className}`}
      type={type}
      onClick={toggle}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  toggle: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
