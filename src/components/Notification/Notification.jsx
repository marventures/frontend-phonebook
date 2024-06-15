import { Toaster } from 'react-hot-toast';

export const Notification = () => {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
        },

        // Default options for specific types
        success: {
          theme: {
            primary: 'green',
          },
        },

        error: {
          theme: {
            primary: 'red',
          },
        },
      }}
    />
  );
};
