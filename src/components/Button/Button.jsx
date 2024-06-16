import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ name, type }) => {
  return (
    <button className={css.button} type={type}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
