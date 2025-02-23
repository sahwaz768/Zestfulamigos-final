'use client'
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Masterheader = dynamic(() => import('./Masterheader'), { ssr: false });

const TicketDetail = ({ userIssue }) => {
  const [hasReplied, setHasReplied] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);

  const handleReplyClick = () => {
    setHasReplied(true);
  };

  const handleSendClick = () => {
    if (userComment.trim() || image) {
      setComment(userComment);
      setUserComment('');
      setHasReplied(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="ticket-head">
        <h1 className="text-lg font-bold">{userIssue.subject}</h1>
        <div className="support-row text-sm font-bold pending">
          {userIssue.status}
        </div>
      </div>
      <div className="ticket-body">
        <div className="message-container">
          <div className="admin-message">
            <div className="message-header">
              <span>Created On: Aug 27, 2024, 01:11 PM</span>
              <span>
                <strong>Admin</strong>
              </span>
            </div>
            <div className="message-body">
              <p>
                Sir/madam, we need to install Visual C++, that we can find from
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
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="image-uploader"
              />
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="image-preview-ticket"
                />
              )}
              <button className="send-button" onClick={handleSendClick}>
                Send
              </button>
            </div>
          )}

          {comment && (
            <div className="reply-message">
              <div className="reply-header">
                <span>Replied On: {new Date().toLocaleString()}</span>
                <span className="font-bold">User</span>
              </div>
              <div className="reply-body">
                <p>{comment}</p>
                {image && (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="image-preview-ticket"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TicketDetail;
