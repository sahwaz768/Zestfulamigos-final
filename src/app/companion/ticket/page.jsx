'use client';
import React, { useEffect, useState } from 'react';
import TicketDetail from '@/components/TicketDetail';
import Loadingbar from '@/components/Loadingbar';

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
    import('@/services/issues/userissues.service')
      .then(({ getIssueDetails }) => getIssueDetails(ticketId))
      .then(({ data }) => {
        if (data) {
          console.log(data);
          setUserIssue(data);
        }
      });
  }, []);

  if (!userIssue)
    return (
      <div>
        <Loadingbar />
      </div>
    );

  return (
    <TicketDetail userIssue={userIssue} getLatestDetails={getTicketDetails} />
  );
};

export default Page;
