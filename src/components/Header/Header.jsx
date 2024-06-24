import { Navigation } from '../Navigation/Navigation';
import { Dropdown } from '../Dropdown/Dropdown';
import { useToggle } from '../../hooks/useToggle';

import { AuthNav } from '../AuthNav/AuthNav';
import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';
import { Avatar } from '../Avatar/Avatar';

export const Header = () => {
  const { isOpen, toggle } = useToggle(false);

  const { isLoggedIn } = useAuth();

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <Avatar toggle={toggle} /> : <AuthNav />}

      {/* DROPDOWN */}
      <Dropdown isOpen={isOpen} onClose={toggle} />
    </header>
  );
};
