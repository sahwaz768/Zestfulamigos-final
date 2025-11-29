'use client';
import { useState } from 'react';
import { capitalizedWord } from '@/utils/common.utils';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { RaiseaIssueModel } from './Models';
import { FiPlus } from 'react-icons/fi';
import Pagination from './Pagination';
import Threeline from './ThreeLine';

const Masterheader = dynamic(() => import('./Masterheader'), { ssr: false });

const ConcernComponent = ({ issuedata, userDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
    
      <div className="support-head mt-2">
        <div className="support-txt">
          <h1 className="md:text-xl ml-3 md:font-bold mt-2">
            Your support requests
          </h1>
        </div>
        <div className="support mt-3" onClick={openModal}>
          <FiPlus color="red" />
          <h1 className="text-sm font-bold">MAKE SUPPORT REQUEST</h1>
        </div>
      </div>
      <div className="support-box-head">
        <div className="support-row-head md:text-xl  mr-7">Ticket no</div>
        <div className="support-row-head md:text-xl ">Topic</div>
        <div className="support-row-head md:text-xl  ">status</div>
        <div className="support-row-2-head md:text-xl ">check</div>
      </div>
      <hr />
      {issuedata ? (
        issuedata?.length ? (
          issuedata.map((l) => (
            <div className="support-box" key={l.issueId}>
              <div className="support-row text-xs font-bold mr-7">{l.issueId}</div>
              <div className="support-row text-sm font-bold">{l.subject}</div>
              <div className="support-row text-sm font-bold pending">
                {capitalizedWord(l.status)}
              </div>
              <div className="support-row-2 text-sm font-bold">
                <Link href={`./ticket?ticketId=${l.issueId}`}>
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
        <RaiseaIssueModel closeModal={closeModal} userDetails={userDetails} />
      )}
       <Pagination/>
    </div>
  );
};

export default ConcernComponent;
