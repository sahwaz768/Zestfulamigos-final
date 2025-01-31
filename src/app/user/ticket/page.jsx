'use client'
import React, { useState } from "react";
import Chatheader from '@/components/Masterheader';
import { Notification } from '../swipepage/page';
import { navLinks } from 'src/utils/constants.js';


const page = () => {
  const [hasReplied, setHasReplied] = useState(false); // Track if the user has replied
  const [userComment, setUserComment] = useState("");
  const [comment, setComment] = useState("");

  const handleReplyClick = () => {
    setHasReplied(true); // Show the reply box
  };

  const handleSendClick = () => {
    if (userComment.trim()) {
      setComment(userComment); // Save the user's reply
      setUserComment(""); // Clear the text area
    }
  };

  const links = navLinks; 
  return (
    <>
    <Chatheader rightElement={<Notification />} navLinks={links} backgroundColor="rgba(250, 236, 236, 0.8)" />
    <div className='ticket-head'>
      <h1 className='text-lg font-bold'>Transaction error</h1>
      <div className='support-row text-sm font-bold pending'>
      pending
     </div>
    </div>
    <div className='ticket-body'>
    <div className="message-container">
      <div className="admin-message">
        <div className="message-header">
          <span>Created On: Aug 27, 2024, 01:11 PM</span>
          <span><strong>Admin</strong></span>
        </div>
        <div className="message-body">
          <p>
            Sir/madam, we need to install Visual C++, that we can find from{" "}
           
            . Please find the attachment.
          </p>
        </div>
        {!comment && !hasReplied && (
          <button className="reply-button" onClick={handleReplyClick}>
            Reply
          </button>
        )}
      </div>

      {hasReplied && !comment && (
        <div className="reply-box">
          <textarea
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            rows="4"
            placeholder="Write your reply here..."
            className="reply-textarea"
          />
          <button className="send-button" onClick={handleSendClick}>
            Send
          </button>
        </div>
      )}

      {comment && (
        <div className="reply-message">
          <div className="reply-header">
            <span>Replied On: {new Date().toLocaleString()}</span>
            <span className="font-bold">user</span>
          </div>
          <div className="reply-body">
            <p>{comment}</p>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  )
}

export default page
