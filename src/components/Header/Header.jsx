import { Navigation } from '../Navigation/Navigation';
import { Sidebar } from '../Sidebar/Sidebar';
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

      {/* SIDEBAR */}
      <Sidebar isOpen={isOpen} onClose={toggle} />
    </header>
  );
};
