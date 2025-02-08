'use client';
import { notiReducerData, notitrigger } from '@/Redux/notiReducer/notiReducer';
import React, { useEffect } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

export const NotificationManager = ({ children }) => {
  const notiData = useSelector(notiReducerData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notiData.open) {
      setTimeout(() => {
        dispatch(notitrigger({ message: null, open: false }));
      }, notiData.duration);
    }
  }, [notiData]);

  const hideError = () => {
    dispatch(notitrigger({ message: null, open: false }));
  };
  return (
    <>
      {/* Error Window */}
      {notiData.open && (
        <div className="flex justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={
              notiData.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }
          >
            <div className="flex items-center gap-1">
              {notiData.type === 'success' ? (
                <FaCheck size={30} />
              ) : (
                <IoIosInformationCircle size={30} color="white" />
              )}
              <span className="text-white font-bold">{notiData.message}</span>
              <button
                className="ml-auto text-xl font-bold cursor-pointer text-white"
                onClick={hideError}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default NotificationManager;
