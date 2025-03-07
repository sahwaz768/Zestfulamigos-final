'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConcernComponent from '@/components/ConcernComponents';
import Loadingbar from '@/components/Loadingbar';

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
  return <ConcernComponent issuedata={issuedata} userDetails={userDetails} />
   
};

export default page;