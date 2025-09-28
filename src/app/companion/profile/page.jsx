'use client';
import Chatheader from '@/components/Masterheader';

import Profileform from '@/components/Profileform';
import { useEffect, useState } from 'react';

export default function Page() {
  const [getData, setgetData] = useState({});
  const signup = async (payload) => {
    console.log('Form submitted with payload in update profile page:', payload);
    {
      /*  const companionDetails = new FormData();
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
    const { data, error: serviceError } =
      await companionRegisterService(companionDetails);
    if (data) {
      console.log('succesfuly registered from :', data);
    } else {
      console.log('error from companion signup page:', serviceError);
} */
    }
  };

  useEffect(() => {
    import('@/services/user/userprofile.service').then(
      ({ getCompanionProfileDetails }) =>
        getCompanionProfileDetails().then(({ data }) => {
          if (data) {
            console.log('Existing companion data:', data);
            setgetData(data);
          }
        })
    );
  }, []);

  return (
    <>
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />

      <div className="md:w-[80rem] w-[100%]  mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
        <h1>Update companion page</h1>

        {getData && Object.keys(getData).length > 0 && (
          <Profileform
            initialValues={getData}
            onSubmit={signup}
            mode="profileupdate"
          />
        )}
      </div>
    </>
  );
}
