import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ name, type, onClick, className }) => {
  return (
    <button className={`${css.button} ${className}`} type={type} onClick={onClick}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
