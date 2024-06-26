import { SyncLoader } from 'react-spinners';
import PropTypes from 'prop-types';

export const Loader = ({ className }) => {
  return <SyncLoader className={className} color='#e85d04' />;
};

Loader.propTypes = {
  className: PropTypes.string,
};
