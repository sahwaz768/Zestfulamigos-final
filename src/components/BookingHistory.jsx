import { capitalizedWord } from '@/utils/common.utils';
import { useRouter } from 'next/navigation';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdOutlinePaid, MdPendingActions } from 'react-icons/md';
import { RiServiceLine } from 'react-icons/ri';

const BookingHistory = ({ bookingdata, isCompanion }) => {
  const router = useRouter();
  return bookingdata?.length ? (
    bookingdata.map((l, i) => (
      <div className="upcoming-slot" key={i * 300}>
        <h1 className="text-sm font-bold text-gray-500 mt-2">
          Last meting with {l.companion?.firstname}
        </h1>
        <div className="flex flex-wrap mt-1 md:gap-8 gap-4">
          <div className="flex items-center text-sm gap-2">
            <IoCalendarOutline />
            <h1>{l.bookingdate}</h1>
          </div>
          <div className="flex  text-sm gap-2 items-center">
            <RiServiceLine /> <h1>Service booked</h1>
          </div>
          <div className="flex  text-sm gap-2 items-center">
            <MdPendingActions />
            <h1>Status: {capitalizedWord(l.status)}</h1>
          </div>
          {isCompanion ? null : (
            <div className="flex  text-sm gap-2 items-center">
              <MdOutlinePaid />
              <h1>Paid amount: {l.amount}</h1>
            </div>
          )}
        </div>
        <div>
          {l.status === 'COMPLETED' ? (
            <>
              <button onClick={() => router.push(`./rate?bookingId=${l.id}`)}>
                Rate
              </button>
              {isCompanion ? null : (
                <button
                  className="ml-4"
                  onClick={() => {
                    router.push(`./timeslote?companionId=${l.companion.id}`);
                  }}
                >
                  Book again
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    ))
  ) : (
    <div>No Booking History Found</div>
  );
};

export default BookingHistory;
