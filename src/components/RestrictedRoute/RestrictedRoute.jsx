import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
/**
 * - If the route is restricted and the user is logged in, render a <Navigate> to redirectTo
 * - Otherwise render the component
 */

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

RestrictedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
