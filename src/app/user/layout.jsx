'use client';
import { useEffect } from 'react';
import withAuth from '../../shared/hoc/wihAuth';
import { redirect } from 'next/navigation';
import { getNotificationButton } from '@/utils/notification.utils';

const UserLayout = ({ children, userDetails }) => {
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
          appDispatch(
            datafetched(
              data?.data?.map((l) => ({ ...l, ...getNotificationButton(l) }))
            )
          );
        }
      });
  }, []);
  useEffect(() => {
    if (userDetails && userDetails.isCompanion) {
      redirect('/companion/dashboard');
    }
  }, [userDetails]);
  return <div>{children}</div>;
};

export default withAuth(UserLayout);
