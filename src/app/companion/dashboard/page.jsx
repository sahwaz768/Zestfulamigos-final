'use client';
import React, { useEffect, useState } from 'react';
import { PiSquaresFourDuotone } from 'react-icons/pi';
import Couple from '@/shared/Assets/dashcouple.png';
import Image from 'next/image';
import { IoIosStar } from 'react-icons/io';
import { Mastersidebar } from '@/components/MasterSidebar';
import Notify from '@/components/Notify';
import { useSelector } from 'react-redux';
import { BASEURL } from '@/Constants/services.constants';
import { capitalizedWord } from '@/utils/common.utils';
import { CancelBookingModel } from '@/components/Models';
import Loadingbar from '@/components/Loadingbar';

const page = () => {
  const [openModel, setOpenModel] = useState({ data: null, open: false });

  const userDetails = useSelector((state) => state.AuthReducer.data);
  const [historyData, setHistoryData] = useState(null);

  const openModal = (id) => {
    setOpenModel({
      data: { userId: userDetails?.userId, bookingid: id },
      open: true
    });
  };
  const closeModal = (l) => {
    if (l) {
      import('../../../services/user/bookings.service')
        .then(({ getUpcomingBookingforCompanion, getRatingforUser }) =>
          Promise.all([getUpcomingBookingforCompanion(), getRatingforUser()])
        )
        .then(async ([{ data }, { data: ratingdata }]) => {
          if (data) {
            const { formatBookingTimingsforUi } = await import(
              '../../../utils/bookings.utils'
            );
            const values = { pastBooking: [], upcoming: [], rating: null };
            for (let i = 0; i < data.length; i += 1) {
              const value = {
                id: data[i].id,
                companion: data[i].users.filter((l) => l.isCompanion)[0],
                user: data[i].users.filter((l) => !l.isCompanion)[0],
                bookingdate: formatBookingTimingsforUi(
                  data[i].bookingstart,
                  data[i].bookingend
                ),
                isPast:
                  new Date(Number(data[i].bookingstart)).getTime() < Date.now(),
                status: data[i].status,
                amount: data[i].amount,
                purpose: data[i].purpose,
                meetinglocation: data[i].meetinglocation,
                sessions: data[i].sessions
              };
              if (value.isPast) values.pastBooking.push(value);
              else values.upcoming.push(value);
            }
            if (ratingdata) {
              values.rating = ratingdata[0];
            }
            setHistoryData(values);
          }
        })
        .catch((err) => console.log('Error', err))
        .finally(() => setOpenModel({ data: null, open: false }));
    } else {
      setOpenModel({ data: null, open: false });
    }
  };

  // validation for text area
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    import('../../../services/user/bookings.service')
      .then(({ getUpcomingBookingforCompanion, getRatingforUser }) =>
        Promise.all([getUpcomingBookingforCompanion(), getRatingforUser()])
      )
      .then(async ([{ data }, { data: ratingdata }]) => {
        if (data) {
          const { formatBookingTimingsforUi } = await import(
            '../../../utils/bookings.utils'
          );
          const values = { pastBooking: [], upcoming: [], rating: null };
          for (let i = 0; i < data.length; i += 1) {
            const value = {
              id: data[i].id,
              companion: data[i].users.filter((l) => l.isCompanion)[0],
              user: data[i].users.filter((l) => !l.isCompanion)[0],
              bookingdate: formatBookingTimingsforUi(
                data[i].bookingstart,
                data[i].bookingend
              ),
              status: data[i].status,
              amount: data[i].amount,
              purpose: data[i].purpose,
              meetinglocation: data[i].meetinglocation,
              sessions: data[i].sessions
            };
            if (value.isPast) values.pastBooking.push(value);
            else values.upcoming.push(value);
          }
          if (ratingdata) {
            values.rating = ratingdata[0];
          }
          setHistoryData(values);
        }
      })
      .catch((err) => console.log('Error', err));
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validation check
  //   if (text.trim() === '') {
  //     setError('please specify the reason');
  //     return;
  //   }
  //   const bookingDetails = {
  //     userId: userDetails?.userId,
  //     bookingid: isOpen.id
  //   };
  //   try {
  //     const { cancelBooking } = await import(
  //       '../../../services/user/bookings.service'
  //     );
  //     const { data } = await cancelBooking(bookingDetails);
  //     if (data) {
  //       setIsOpen(null);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setError('');
  //     console.log('Submitted text:', text);
  //     setText('');
  //   }
  // };
  if (!userDetails)
    return (
      <div>
        <Loadingbar />
      </div>
    );

  return (
    <>
      <div className="dashboard-threeline">
        <div className="notifymbsecond">
          <Notify backgroundColor="transparent" color="black" />
        </div>
      </div>
      <div className="flex">
        <div>
          <Mastersidebar isCompanion={true} className="sbar-height" />
        </div>
        <div className="dashboard">
          <div className="dashboard-header ">
            <div className="flex justify-center items-center ml-4 ">
              <div className="dots4">
                <PiSquaresFourDuotone color="gray" size={50} />
              </div>
              <div>
                <h1 className="font-bold">Dashboard</h1>
                <h1 className="text-sm text-pink-700">
                  {new Date().toLocaleString('en-US', { weekday: 'long' })}{' '}
                  <span className="text-black">
                    {' '}
                    {new Date().toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </h1>
              </div>
            </div>
            <div className="comp-admin flex justify-center items-center">
              <Image
                src={BASEURL + '/' + userDetails?.Images[0]}
                alt="Picture of the author"
                width={117}
                height={111}
              />
              <h1 className="text-sm">{userDetails?.name}</h1>
            </div>
          </div>
          <div className="dashboard-midsection flex">
            <div className="mt-5">
              <h1 className="md:text-3xl font-bold ml-5 ">
                Hi, {userDetails?.name}
              </h1>
              <h1 className="md:mt-3 ml-5 md:text-base text-sm">
                Ready to start your day with same pitch decks
              </h1>
            </div>
            <div className="midsection-image">
              <Image src={Couple} alt="Picture of the author" />
            </div>
          </div>
          <div className="dashboard-overview">
            <h1>Overview</h1>
            <div className="flex gap-4">
              <div className="overview-box">
                <IoIosStar color="yellow" size={30} />
                <div>
                  Last rating
                  <div className="flex  items-center">
                    {historyData?.rating?.last_rating ? (
                      Array.from(
                        { length: Number(historyData?.rating?.last_rating) },
                        (_, i) => i
                      ).map((l) => (
                        <IoIosStar color="yellow" size={15} key={l} />
                      ))
                    ) : (
                      <IoIosStar color="gray" size={15} />
                    )}
                  </div>
                </div>
              </div>
              <div className="overview-box">
                <IoIosStar color="yellow" size={30} />
                <div>
                  <h1>Average rating</h1>
                  <h1 className="font-bold">
                    {historyData?.rating?.bayesian_avg
                      ? `${Number(historyData?.rating?.bayesian_avg).toFixed(2)}/${historyData.rating.rating_count}`
                      : ''}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {historyData?.upcoming.length ? (
            historyData.upcoming?.map((l) => (
              <div className="dashboard-userdetail" key={l.id}>
                <div className="dashboard-userprofile">
                  <Image
                    src={BASEURL + '/' + l?.user?.Images[0]}
                    alt="Picture of the author"
                    width={117}
                    height={111}
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="md:mt-2 ml-2 gap-2">
                    <h1 className="text-sm md:text-base">
                      Name:
                      <span className="md:font-bold">{l.user?.firstname}</span>
                    </h1>
                    <h1 className="text-sm md:text-base">
                      Age:<span className="md:font-bold">{l.user?.age}</span>
                    </h1>
                    <h1 className="text-sm md:text-base">
                      Gender:
                      <span className="md:font-bold">{l.user?.gender}</span>
                    </h1>
                  </div>
                  <div className="dashboard-purpose md:mt-2  gap-2">
                    <h1 className="text-sm md:text-base">
                      Time and date:
                      <span className="md:font-bold ">{l?.bookingdate} </span>
                    </h1>
                    <h1 className="text-sm md:text-base">
                      Location of meet- up:
                      <span className="md:font-bold ">
                        {l.meetinglocation.address}
                      </span>
                    </h1>
                    <h1 className="text-sm md:text-base">
                      Purpose of meet:
                      <span className="md:font-bold ">{l?.purpose}</span>
                    </h1>
                    <h1 className="text-sm md:text-base">
                      status:
                      <span className="md:font-bold ">
                        {capitalizedWord(l.status)}
                      </span>
                    </h1>
                  </div>
                </div>
                {l.status === 'ACCEPTED' && !l.sessions?.length ? (
                  <div className="dashboard-cancel">
                    <button onClick={() => openModal(l.id)}>Cancel</button>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div>No Upcoming Bookings...</div>
          )}
        </div>
      </div>

      {openModel.open && (
        <CancelBookingModel
          closeModal={closeModal}
          bookingDetail={openModel.data}
        />
      )}
    </>
  );
};

export default page;
