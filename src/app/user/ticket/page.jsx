'use client';
import React, { useEffect, useState } from 'react';
import TicketDetail from '@/components/TicketDetail';
import Loadingbar from '@/components/Loadingbar';
import Chatheader from '@/components/Masterheader';

import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';


const Page = () => {
  const [userIssue, setUserIssue] = useState(null);
  const getTicketDetails = async (ticketId) => {
    if (!ticketId) {
      return;
    }
    const { getIssueDetails } = await import(
      '@/services/issues/userissues.service'
    );
    const { data } = await getIssueDetails(ticketId);
    if (data) {
      setUserIssue({ ...data, issueId: ticketId });
    }
  };

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const ticketId = params.get('ticketId');
    getTicketDetails(ticketId);
  }, []);

  if (!userIssue)
    return (
      <div>
        <Loadingbar />
      </div>
    );

  return (
    <>
    <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />

      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <Mastersidebar className="sbar-height-chat"  />
      <div className="min-h-screen  overflow-hidden">
        <div className="md:w-[75rem] w-[100%] mx-auto md:px-0 px-2 py-2">
    <TicketDetail userIssue={userIssue} getLatestDetails={getTicketDetails} />
    </div>
    </div>
    </>
  );
};

export default Page;
