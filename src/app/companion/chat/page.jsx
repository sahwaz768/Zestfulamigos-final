'use client';
import { useEffect, useState } from 'react';
import ChatComponent from '@/components/ChatComponent';

const page = () => {
   const [chatrooms, setChatRooms] = useState(null);
  
  
    useEffect(() => {
      import('../../../services/user/chats.service')
        .then(({ getActiveChatsService }) => getActiveChatsService())
        .then(({ data }) => {
          if (data) {
            const values = data.map((l) => ({
              user: l.User.filter((p) => !p.isCompanion)[0],
              companion: l.User.filter((p) => p.isCompanion)[0],
              id: l.id,
              booking: l.Bookings,
              session: l.Bookings?.Sessions
            }));
            setChatRooms(values);
          }
        });
    }, []);
  
  
    if (!chatrooms) return <div>Loading...</div>;
  return <ChatComponent chatrooms={chatrooms} isCompanion={true} />;
};

export default page;
