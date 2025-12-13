'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConcernComponent from '@/components/ConcernComponents';
import Loadingbar from '@/components/Loadingbar';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';


const page = () => {
  const [issuedata, setissuedata] = useState(null);
  const userDetails = useSelector((state) => state.AuthReducer.data);

  useEffect(() => {
    import('@/services/issues/userissues.service')
      .then(({ getAllActiveIssues }) => getAllActiveIssues())
      .then(({ data }) => {
        if (data) {
          setissuedata(data);
        }
      });
  }, []);

  if(!userDetails || !issuedata){
    return <div><Loadingbar/></div>
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];
  return <> 
  <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
  
        <div className="notifymbsecond">
          <Notify backgroundColor="transparent" color="black" />
        </div>
        <Mastersidebar className="sbar-height-chat"  />
        <div className="min-h-screen  overflow-hidden">
          <div className="md:w-300 w-full mx-auto md:px-0 px-2 py-2">
  
  <ConcernComponent issuedata={issuedata} userDetails={userDetails} />
  </div>
  </div>
   </>
   
};

export default page;
