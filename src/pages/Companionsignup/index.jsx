'use client';
import Masterheader from '@/components/Masterheader';
import Form from '@/components/Profileform';
import { useEffect } from 'react';

export default function Companionsignup() {
  const signup = async (payload) => {

    console.log('payload from companion signup page:', payload);
    
    const companionDetails = new FormData();
    const previousImages = [];

   for (let key in payload) {
      if (key === 'images') {
        payload[key].forEach((img) => {
          if (typeof img === 'string') {
            previousImages.push(img); // old image URLs
          } else if (img?.file) {
            companionDetails.append('images', img.file); // new uploaded file
          }
        });
      } else if (
        ['description', 'baselocations', 'paymentmethods'].includes(key)
      ) {
        companionDetails.append(key, JSON.stringify(payload[key] || []));
      } else if (key !== 'id') {
        companionDetails.append(key, payload[key]);
      }
    }
    if (previousImages.length > 0) {
      companionDetails.append('previousImages', JSON.stringify(previousImages));
    }
    const obj = {};
    for (let [key, value] of companionDetails.entries()) {
      obj[key] = value;
    }
    console.log(obj);

    const { companionRegisterService } = await import(
      '@/services/auth/companionregister.service'
    );

    const { toast } = await import('@/utils/reduxtrigger.utils');
    const { data, error} =
      await companionRegisterService(companionDetails);
    if (data) {
      toast.success("succesfully registered as companion, wait for admin's approval");
    } else {
      toast.error('sorry registration failed');
    }
  
  };

  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" fillBlank />
      <div className="md:w-[80rem] w-[100%]  mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
        <h1 className='text-center font-bold'>Companion Registration</h1>
        <Form initialValues={{}} onSubmit={signup} mode="signup" />
      </div>
    </>
  );
}
