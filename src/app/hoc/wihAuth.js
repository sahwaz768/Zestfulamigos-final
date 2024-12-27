import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      const token = Cookies.get('x-token');
      if (!token) {
        redirect('/');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
