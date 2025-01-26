'use client';
import React, { createContext, useContext, useState } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';


const ErrorContext = createContext();


export const ErrorManager = ({ children }) => {
  const [isErrorVisible, setIsErrorVisible] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 

  
  const showError = (message = 'Something went wrong!') => {
    setErrorMessage(message);
    setIsErrorVisible(true);

    
    setTimeout(() => {
      setIsErrorVisible(false);
    }, 2000);
  };

  
  const hideError = () => {
    setIsErrorVisible(false);
  };

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      {/* Error Window */}
      {isErrorVisible && (
        <div className="flex justify-center fixed top-4 left-0 right-0 z-50">
          <div className="invalide-email">
            <div className="flex items-center gap-1">
              <IoIosInformationCircle size={30} color='white' />
              <span className='text-white font-bold'>{errorMessage}</span>
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
    </ErrorContext.Provider>
  );
};


export const useError = () => useContext(ErrorContext);




