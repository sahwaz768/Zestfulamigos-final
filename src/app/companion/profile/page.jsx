'use client';
import Chatheader from '@/components/Masterheader';
import Loadingbar from '@/components/Loadingbar';
import Profileform from '@/components/Profileform';
import { useEffect, useState } from 'react';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';

export default function Page() {
  const [getData, setgetData] = useState({});
  const [id, setId] = useState(null);
  const signup = async (payload) => {
   // console.log( 'payload in profile',payload);
    
    
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
   // console.log('after stringification in profile:', obj);
    
    

    const { updateCompanionProfileService } = await import(
      '@/services/user/userprofile.service'
    );

    const { toast } = await import('@/utils/reduxtrigger.utils');
    const { data, error } = await updateCompanionProfileService(
      companionDetails,
      id
    );
    if (data) {
      toast.success('succesfully requested for profile update,please wait for admin approval');
    } else {
      toast.error('sorry profile update failed:', error);
    }
  };

  useEffect(() => {
    import('@/services/user/userprofile.service').then(
      ({ getCompanionProfileDetails }) =>
        getCompanionProfileDetails().then(({ data }) => {
          if (data) {
           // console.log('Existing companion data:', data);
            setId(data.Companion?.[0]?.id);

            setgetData(data);
          }
        })
    );
  }, []);
  if (!getData) {
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

      <div className="md:w-[75rem] w-[100%]  mx-auto mt-6 mb-4  p-5 bg-white ">
        {getData && Object.keys(getData).length > 0 ? 
          <>
            <h1 className="font-bold text-center">Update Your Profile</h1>
            <Profileform
              initialValues={getData}
              onSubmit={signup}
              mode="profileupdate"
            />
          </>
        : <Loadingbar />}
      </div>
    </>
  );
}
