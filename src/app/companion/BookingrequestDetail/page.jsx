'use client';
import { useEffect, useState } from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import Image from 'next/image';
import Profilepicture from '@/shared/Assets/Rectangle 10.png';
import { loadGoogleMapsScript } from '@/utils/location';

const page = () => {
  const [lat, setLat] = useState(19.076);
  const [lng, setLng] = useState(72.8777);

  useEffect(() => {
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
  }, [lat, lng]);

  return (
    <>
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <Mastersidebar className="sbar-height-chat" />
      
      <div className="md:w-[75rem] w-[95%] mx-auto md:my-5 my-10 p-8  rounded-2xl shadow-sm">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="font-black text-4xl text-black bg-clip-text">Booking Request Details</h1>
          <p className="text-sm mt-4 text-gray-600 max-w-2xl leading-relaxed">
            Details for the selected request.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">John Doe</h2>
              <div className="bg-pink-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🕐</span>
                  <p className="font-semibold text-gray-700">Booking Time and Date:</p>
                </div>
                <p className="text-gray-600 ml-7">12 July : 11:00 AM - 1:00 PM</p>
              </div>
            </div>
            <div className="relative">
              <Image 
                src={Profilepicture} 
                alt="Profile Picture" 
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-red-500 shadow-lg"
              />
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
              <p className="text-gray-700 ml-11 font-medium">Consultation</p>
            </div>

            {/* Location Section */}
            <div className="bg-pink-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📍</span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Area of Meetup</h3>
              </div>
              <p className="text-gray-700 ml-11 font-medium">Central Park, Bandra West, Mumbai</p>
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
          <div className="flex justify-end gap-4">
            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2">
             
              Accept
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2">
            
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;