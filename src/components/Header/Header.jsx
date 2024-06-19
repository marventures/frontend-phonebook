import { Navigation } from '../Navigation/Navigation';
import { Sidebar } from '../Sidebar/Sidebar';
import { useToggle } from '../../hooks/useToggle';
import { MdOutlinePerson } from 'react-icons/md';
import { AuthNav } from '../AuthNav/AuthNav';
import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';

export const Header = () => {
  const { isOpen, toggle } = useToggle(false);

  const { isLoggedIn } = useAuth();

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? (
        <MdOutlinePerson
          className={`${css.userIcon} ${isOpen && css.visuallyHidden}`}
          onClick={toggle}
        />
      ) : (
        <AuthNav />
      )}

      {/* SIDEBAR */}
      <Sidebar isOpen={isOpen} onClose={toggle} />
    </header>
  );
};
