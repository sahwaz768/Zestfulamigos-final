'use client';
import { useEffect } from 'react';
import withAuth from '../../shared/hoc/wihAuth';

const UserLayout = ({ children }) => {
  useEffect(() => {
    import('../..//services/user/notifications.service')
      .then(({ getNotifications }) => getNotifications())
      .then(async ({ data }) => {
        if (data) {
          const datafetched = (
            await import(
              '../../Redux/userNotifications/userNotificationReducer'
            )
          ).datafetched;
          const { appDispatch } = await import('../../Redux/store/store');
          appDispatch(datafetched(data?.data?.filter((l) => l)));
        }
      });
  }, []);
  return <div>{children}</div>;
};

export default withAuth(UserLayout);
