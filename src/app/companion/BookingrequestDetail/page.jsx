'use client';
import { useEffect, useState } from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import Image from 'next/image';
import Profilepicture from '@/shared/Assets/Rectangle 10.png';
import { loadGoogleMapsScript } from '@/utils/location';
import Loadingbar from '@/components/Loadingbar';
import { useRouter } from 'next/navigation';

const page = () => {
  const [Bookingdata, setBookingData] = useState(null);
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const formatBookingTime = (startTimestamp, endTimestamp) => {
    const start = new Date(Number(startTimestamp));
    const end = new Date(Number(endTimestamp));

    const dateOptions = { day: 'numeric', month: 'short' }; // e.g., "12 July"
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

    const date = start.toLocaleDateString('en-GB', dateOptions);
    const startTime = start.toLocaleTimeString('en-US', timeOptions);
    const endTime = end.toLocaleTimeString('en-US', timeOptions);

    return `${date} : ${startTime} - ${endTime}`;
  };

  useEffect(() => {
    if (!Bookingdata?.Meetinglocation?.[0]) return;

    const { lat, lng } = Bookingdata.Meetinglocation[0];

    if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;

    loadGoogleMapsScript()
      .then(() => {
        const location = new window.google.maps.LatLng(
          parseFloat(lat),
          parseFloat(lng)
        );
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom: 14
        });
        new window.google.maps.Marker({
          position: location,
          map,
          title: 'Location'
        });
      })
      .catch((err) => console.error('Google Maps failed to load:', err));
  }, [Bookingdata]);

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let bookingId = params.get('bookingid');

    const fetchData = async () => {
      try {
        const { getBookingRequestDetails } = await import(
          '@/services/user/bookings.service'
        );
        const result = await getBookingRequestDetails(bookingId);
        if (result.data) {
          setBookingData(result.data.data);
          console.log('for status data', result.data.data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchData();

    const fetchAcceptData = async () => {
      try {
        const { getAcceptBooking } = await import(
          '@/services/user/bookings.service'
        );
        const { toast } = await import('@/utils/reduxtrigger.utils');
        const result = await getAcceptBooking(bookingId);
        if (result.data) {
          toast.success('Successfully request Accepted!!');
          router.back();
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    const fetchRejectData = async () => {
      try {
        const { getRejectBooking } = await import(
          '@/services/user/bookings.service'
        );
        const { toast } = await import('@/utils/reduxtrigger.utils');
        const result = await getRejectBooking(bookingId);
        if (result.data) {
          toast.error(' request Rejected!!');
          router.back();
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    if (status === 'accepted') {
      fetchAcceptData();
    } else if (status === 'rejected') {
      fetchRejectData();
    }
  }, [status]);

  useEffect(() => {
    if (Bookingdata) {
      console.log('Booking Data Updated:', Bookingdata.bookingstatus);
    }
  }, [Bookingdata]);

  if (!Bookingdata) {
    return (
      <div>
        <Loadingbar />
      </div>
    );
  }

  return (
    <>
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <Mastersidebar className="sbar-height-chat" isCompanion={true} />

      <div className="md:w-[75rem] w-[95%] mx-auto md:my-5 my-10 p-8  rounded-2xl shadow-sm">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="font-black text-2xl text-black bg-clip-text">
            Booking Request Details
          </h1>
          <p className="text-sm mt-4 text-gray-600 max-w-2xl leading-relaxed">
            Details for the selected request.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {Bookingdata?.User?.[0]?.firstname}{' '}
                {Bookingdata?.User?.[0]?.lastname || ''}
              </h2>
              <div className="bg-pink-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🕐</span>
                  <p className="font-semibold text-gray-700">
                    Booking Time and Date:
                  </p>
                </div>
                <p className="text-gray-600 ml-7">
                  {formatBookingTime(
                    Bookingdata?.bookingstart,
                    Bookingdata?.bookingend
                  )}
                </p>
              </div>
            </div>
            <div className="relative">
              {Bookingdata?.User?.[0]?.Images?.[0] && (
                <Image
                  src={Bookingdata.User[0].Images[0]}
                  alt="Profile Picture"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-red-500 shadow-lg"
                />
              )}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="space-y-6">
            {/* Purpose Section */}
            <div className="bg-pink-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Purpose</h3>
              </div>
              <p className="text-gray-700 ml-11 font-medium">
                {Bookingdata?.bookingpurpose}
              </p>
            </div>

            {/* Location Section */}
            <div className="bg-pink-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📍</span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Area of Meetup
                </h3>
              </div>
              <p className="text-gray-700 ml-11 font-medium">
                {Bookingdata?.Meetinglocation[0]?.address}
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🗺️</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Meetup Location</h3>
          </div>

          <div className=" rounded-xl p-4">
            <div
              id="map"
              className="w-full h-96 bg-gray-100 rounded-xl border-2 border-dashed border-pink-200 flex items-center justify-center"
              style={{
                minHeight: '400px'
              }}
            >
              <div className="text-center">
                <span className="text-4xl block mb-2">🗺️</span>
                <p className="text-gray-500">Map will load here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white p-6 shadow-sm ">
          {Bookingdata?.bookingstatus !== 'ACCEPTED' && (
            <div className="flex justify-end gap-4">
              <button
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
                onClick={() => setStatus('accepted')}
              >
                Accept
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
                onClick={() => setStatus('rejected')}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
