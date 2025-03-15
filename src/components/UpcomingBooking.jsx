import { useState } from 'react';
import { capitalizedWord } from '@/utils/common.utils';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdOutlinePaid, MdPendingActions } from 'react-icons/md';
import { RiServiceLine } from 'react-icons/ri';
import { CancelBookingModel } from './Models';

const UpcomingBooking = ({ bookingdata, isCompanion, getUpcomingBooking }) => {
  const [isOpen, setIsOpen] = useState(null);
  const handleCancelClick = async () => {
    const bookingDetails = {
      bookingid: isOpen.id
    };
    try {
      const { cancelBooking } = await import(
        '@/services/user/bookings.service'
      );
      const { data } = await cancelBooking(bookingDetails);
      if (data) {
        getUpcomingBooking();
        setIsOpen(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelBookingCloseModel = (l) => {
    if (l) {
      getUpcomingBooking();
    }
    setIsOpen(null);
  };
  return bookingdata?.length ? (
    bookingdata.map((l, i) => (
      <div className="upcoming-slot" key={i * 500}>
        <h1 className="text-sm font-bold text-gray-500 mt-2">
          Upcoming meting with{' '}
          {isCompanion ? l.user?.firstname : l.companion?.firstname}
        </h1>
        <div className="flex flex-wrap mt-1 gap-4 md:gap-8">
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
        {l.status === 'ACCEPTED' && (
          <div>
            <button onClick={() => setIsOpen(l)}>Cancel</button>
          </div>
        )}
        {!isCompanion && l.status == 'TRANSACTIONPENDING' ? (
          <div>
            <button
              onClick={() => router.push(`/user/payment?bookingId=${l.id}`)}
            >
              Complete your Payment
            </button>
          </div>
        ) : null}
        {isOpen ? (
          isCompanion ? (
            <CancelBookingModel
              closeModal={handleCancelBookingCloseModel}
              bookingDetail={isOpen}
            />
          ) : (
            <div className="modal-overlay-cancel">
              <div
                className="modal-container-cancel"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="">
                  <h1 className="text-center text-2xl font-bold">
                    Are you sure
                  </h1>
                  <div className="flex justify-center gap-2 mr-3 my-3">
                    <button className="yes" onClick={handleCancelClick}>
                      Yes
                    </button>
                    <button className="no" onClick={() => setIsOpen(null)}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>
    ))
  ) : (
    <div>No Upcoming Bookings found</div>
  );
};

export default UpcomingBooking;
