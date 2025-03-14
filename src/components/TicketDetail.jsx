'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { formatBookingTime } from '@/utils/bookings.utils';
import { toast } from '@/utils/reduxtrigger.utils';

const Masterheader = dynamic(() => import('./Masterheader'), { ssr: false });
const Threeline = dynamic(() => import('./ThreeLine'), { ssr: false });

const TicketDetail = ({ userIssue, getLatestDetails }) => {
  const [isUserWanttoaddComment, setisUserWanttoaddComment] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userCommentData, setUserCommentData] = useState({
    images: null,
    comment: ''
  });
  const handleSendClick = async () => {
    setLoading(() => true);
    const { addCommentonIssue } = await import(
      '@/services/issues/userissues.service'
    );
    const values = {
      issueId: userIssue.id,
      comment: userCommentData.comment
    };
    const { data } = await addCommentonIssue(values);
    if (data) {
      getLatestDetails(userIssue.issueId);
    } else {
      toast.error('Error in comment');
      setUserCommentData({ images: null, comment: '' });
    }
    setLoading(() => false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
      toast.error('Invalid Image');
      return;
    } else {
      setUserCommentData((l) => ({ ...l, images: file }));
    }
  };

  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <Threeline />
      <div className="">
        <div className="ticket-head">
          <hr />
          <div className="flex justify-between p-3">
            <div>
              <h1 className="font-bold text-2xl">Ticket#{userIssue.issueId}</h1>
              <h1>{userIssue.subject}</h1>
            </div>
            <div className="pending">{userIssue.status}</div>
          </div>
          <hr />
          <div className="flex mt-3">
            <span className="font-bold">Subject:</span>
            <h1 className="">{userIssue.subject}</h1>
          </div>
        </div>

        <div className=" ml-5 flex ">
          <span className="font-bold">Description:</span>
          {userIssue.explanation}
        </div>
      </div>
      <div className="ticket-body">
        <div className="message-container">
          {userIssue.comments.length
            ? userIssue.comments.map((l, i) => (
                <div className="admin-message" key={i * 400}>
                  <div className="message-header">
                    <span>Created On: {formatBookingTime(l.created)}</span>
                    <span>
                      <strong>{l.User.isAdmin ? 'Admin' : 'You'}</strong>
                    </span>
                  </div>
                  <div className="message-body">
                    <p>{l.comment}</p>
                    {l.screenshots.length ? (
                      <a
                        href="/path/to/admin/image.jpg"
                        download
                        className="attachment-link"
                      >
                        <img
                          src="/sdh"
                          alt=" Download"
                          className="attachment-preview"
                        />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))
            : null}

          {isUserWanttoaddComment ? (
            <div className="reply-box">
              <textarea
                value={userCommentData.comment}
                onChange={(e) =>
                  setUserCommentData((l) => ({ ...l, comment: e.target.value }))
                }
                rows="4"
                placeholder="Write your reply here..."
                className="reply-textarea"
              />
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
                className="image-uploader"
              />
              {userCommentData.images && (
                <img
                  src={URL.createObjectURL(userCommentData.images)}
                  alt="Preview"
                  className="image-preview-ticket"
                />
              )}
              <button
                className="send-button"
                onClick={handleSendClick}
                disabled={isLoading}
              >
                {isLoading ? 'Sending..' : 'Send'}
              </button>
            </div>
          ) : (
            <button onClick={() => setisUserWanttoaddComment(true)}>
              Comment
            </button>
          )}

          {/* {comment && (
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
          )} */}
        </div>
      </div>
    </>
  );
};

export default TicketDetail;
