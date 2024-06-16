import css from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={css.footerContainer}>
      &copy; {new Date().getFullYear()}{' '}
      <a
        className={css.footerLink}
        href='https://www.linkedin.com/in/marventures/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Marvin Pacis
      </a>
    </footer>
  );
};
