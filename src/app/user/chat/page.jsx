'use client';
import React, { useEffect, useState } from 'react';
import { GoLocation } from 'react-icons/go';
import { AiOutlineSafety } from 'react-icons/ai';
import { CiLocationOff } from 'react-icons/ci';
import { BiLocationPlus } from 'react-icons/bi';
import { IoIosTimer } from 'react-icons/io';
import ChatComponent from '@/components/ChatComponent';

const Page = React.memo((props) => {
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

  return <ChatComponent chatrooms={chatrooms} />
});

export const Guidmodel = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      {isModalOpen && (
        <div className="Guild-modal-overlay">
          <div
            className="Guild-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-2xl text-center">Guildelines</h2>
            <div className="flex items-center gap-2 text-xl mt-3">
              <h1>Safety Guildelines for Visits </h1>
              <AiOutlineSafety color="pink" />
            </div>
            <h1 className="text-sm my-2">
              To ensure your safety and maintain the highest standards of
              service, please adhere to the following instructions when meeting
              clients:
            </h1>
            <div className="flex items-center gap-2 text-xl mt-3">
              <h1>Approved Location</h1>
              <GoLocation color="pink" />
            </div>
            <div className="ml-2 text-sm mt-2 gap-2">
              <li>
                Meet only in public, secure venues such as well-known cafes,
                restaurants, hotels, or coworking spaces.
              </li>
              <li>
                Commercial zones and high-traffic areas are preferred, ensuring
                proper lighting and accessibility.{' '}
              </li>
              <li>
                Corporate and private events that have undergone security
                verification are permissible, provided the venue meets safety
                standards.
              </li>
              <li>
                {' '}
                If unsure about a location, consult with your supervisor before
                confirming the visit.
              </li>
            </div>
            <div className="flex items-center gap-2 text-xl mt-3">
              <h1>Prohibited Location</h1>
              <CiLocationOff color="pink" />
            </div>
            <div className="ml-2 text-sm mt-2 gap-2">
              <li>
                Remote or isolated areas are strictly off-limits. This includes
                any location with poor visibility, security, or lighting.
              </li>
              <li>
                Avoid any private residences unless explicitly approved and
                background-checked by our team.
              </li>
              <li>
                {' '}
                High-risk neighborhoods identified for crime or unsafe
                conditions should never be considered for client meetings.
              </li>
              <li>
                Any abandoned or under-construction sites are strictly
                prohibited.
              </li>
            </div>
            <div className="flex items-center gap-2 text-xl mt-3">
              <h1>Additional Safety Measure</h1>
              <BiLocationPlus color="pink" />
            </div>
            <div className="ml-2 text-sm mt-2">
              <li>
                Always share your location in real-time with your supervisor
                during visits.{' '}
              </li>
              <li>
                Carry a mobile phone with emergency contacts readily accessible.
              </li>
              <li>
                If you feel unsafe or uncomfortable at any time, immediately
                exit the situation and report it to management.
              </li>
            </div>
            <div className="flex items-center gap-2 text-xl mt-3">
              <h1>Suggested Timings</h1>
              <IoIosTimer color="pink" />
            </div>
            <div className="ml-2 text-sm mt-2">
              <li>
                Daytime Visits: Preferably between 10:00 AM and 7:00 PM, when
                there is ample daylight and higher public activity.
              </li>
              <li>
                Evening Visits: If necessary, schedule between 7:00 PM and 10:00
                PM only in well-secured, high-traffic areas.
              </li>
              <li>
                No Late-Night Visits: Avoid scheduling any visits after 10:00 PM
                for safety reasons, unless it's a secure, verified venue (e.g.,
                corporate events, hotels).
              </li>
            </div>
            <button onClick={closeModal}>Continue</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
