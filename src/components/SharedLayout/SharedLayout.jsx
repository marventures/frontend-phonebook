import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Suspense } from 'react';
import css from './SharedLayout.module.css';
import { Footer } from '../Footer/Footer';
import { Notification } from '../Notification/Notification';

export const SharedLayout = () => {
  return (
    <div className={css.container}>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
        <Notification />
      </Suspense>
      <Footer />
    </div>
  );
};
