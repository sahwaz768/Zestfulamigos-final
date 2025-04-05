'use client';
import { useEffect, useState } from 'react';
import ChatComponent from '@/components/ChatComponent';
import Loadingbar from '@/components/Loadingbar';

const page = () => {
  const [chatrooms, setChatRooms] = useState(null);

  useEffect(() => {
    import('../../../services/user/chats.service')
      .then(({ getActiveChatsService }) => getActiveChatsService())
      .then(({ data, error }) => {
        if (data) {
          const values = data.map((l) => ({
            user: l.User.filter((p) => !p.isCompanion)[0],
            companion: l.User.filter((p) => p.isCompanion)[0],
            id: l.id,
            booking: l.Bookings,
            session: l.Bookings?.Sessions
          }));
          setChatRooms({ chats: values, isEmailVerified: true });
        } else if (error === 'Email not verified') {
          setChatRooms({ chats: [], isEmailVerified: false });
        }
      });
  }, []);

  if (!chatrooms)
    return (
      <div>
        <Loadingbar />
      </div>
    );
  return (
    <ChatComponent
      chatrooms={chatrooms.chats}
      isCompanion={true}
      isEmailVerified={chatrooms.isEmailVerified}
    />
  );
};

export default page;
