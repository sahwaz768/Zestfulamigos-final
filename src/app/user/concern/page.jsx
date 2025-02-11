'use client';

import { FiPlus } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Chatheader from '@/components/Masterheader';
import { Threeline } from '../swipepage/page';
import { Mastersidebar } from '@/components/MasterSidebar';
import { capitalizedWord } from '@/utils/common.utils';
import { RaiseaIssueModel } from '@/components/Models';

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [issuedata, setissuedata] = useState(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  useEffect(() => {
    import('@/services/issues/userissues.service')
      .then(({ getAllActiveIssues }) => getAllActiveIssues())
      .then(({ data }) => {
        if (data) {
          setissuedata(data);
        }
      });
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];
  return (
    <div>
      <Chatheader
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={navLinks}
      />
      <Threeline />
      <Mastersidebar />
      <div className="support-head">
        <div className="support-txt">
          <h1 className="md:text-xl ml-3 md:font-bold mt-2">
            Your support requests
          </h1>
        </div>
        <div className="support" onClick={openModal}>
          <FiPlus color="red" />
          <h1 className="text-sm font-bold">MAKE SUPPORT REQUEST</h1>
        </div>
      </div>
      <div className="support-box-head">
        <div className="support-row-head md:text-xl ">Ticket no</div>
        <div className="support-row-head md:text-xl ">Topic</div>
        <div className="support-row-head md:text-xl  ">status</div>
        <div className="support-row-2-head md:text-xl ">check</div>
      </div>
      <hr />
      {issuedata ? (
        issuedata?.length ? (
          issuedata.map((l) => (
            <div className="support-box" key={l.issueId}>
              <div className="support-row text-sm font-bold">{l.issueId}</div>
              <div className="support-row text-sm font-bold">{l.subject}</div>
              <div className="support-row text-sm font-bold pending">
                {capitalizedWord(l.status)}
              </div>
              <div className="support-row-2 text-sm font-bold">
                <Link href={'/user/ticket'}>
                  {' '}
                  <h1>view</h1>{' '}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No Active Issues</div>
        )
      ) : (
        <div>Loading Issues</div>
      )}

      {isOpen && (
        <RaiseaIssueModel closeModal={closeModal} />
      )}
    </div>
  );
};

export default page;
