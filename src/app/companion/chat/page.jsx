'use client';
import { useEffect } from 'react';
import ChatComponent from '@/components/ChatComponent';
import Loadingbar from '@/components/Loadingbar';
import { useSelector } from 'react-redux';
import { selectChatRoomData } from '@/Redux/chatroomReducer/chatroomReducer';

const page = () => {
  const chatrooms = useSelector(selectChatRoomData)

  useEffect(() => {
    import('../../../services/user/chats.service')
      .then(({ getActiveChatsService }) => getActiveChatsService())
      .then(async ({ data, error }) => {
        const { appDispatch } = await import('@/Redux/store/store');
        const { datafetched } = await import("@/Redux/chatroomReducer/chatroomReducer")
        if (data) {
          const values = data.map((l) => ({
            user: l.User.filter((p) => !p.isCompanion)[0],
            companion: l.User.filter((p) => p.isCompanion)[0],
            id: l.id,
            booking: l.Bookings,
            session: l.Bookings?.Sessions
          }));
          appDispatch(datafetched({ chats: values, isEmailVerified: true }));
        } else if (error === 'Email not verified') {
          appDispatch(datafetched({ chats: [], isEmailVerified: false }));
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
