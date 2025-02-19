'use client';
import React, { useEffect, useState } from 'react';
import TicketDetail from '@/components/TicketDetail';

const Page = () => {
  const [userIssue, setUserIssue] = useState(null);

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

  if (!userIssue) return <div>Loading...</div>;

  return <TicketDetail userIssue={userIssue} />;
};

export default Page;
