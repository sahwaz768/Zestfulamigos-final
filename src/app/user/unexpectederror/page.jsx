import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <svg
            className="w-24 h-24 text-pink-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v5" />
            <circle cx="12" cy="16" r="1" />
          </svg>
        </div>

        {/* Error Message */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-pink-800">
            Oops! Something Went Wrong
          </h1>
          <p className="text-pink-700 text-lg">
            We've encountered an unexpected error. Don't worry, it's not your
            fault!
          </p>
          <p className="text-pink-600 text-sm">
            Error Code: 500 - Internal Server Error
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 
                     transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 9 9 9 9 0 0 1-9 9" />
              <path d="M3 12h9" />
              <path d="m9 16 4-4-4-4" />
            </svg>
            Retry
          </button>
          <button
            className="px-6 py-3 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 
                     transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-pink-100 p-6 rounded-lg">
          <h2 className="text-pink-800 font-semibold mb-2">
            What you can try:
          </h2>
          <ul className="text-pink-700 space-y-2 list-disc list-inside">
            <li>Refresh the page</li>
            <li>Check your internet connection</li>
            <li>Try again in a few minutes</li>
            <li>Clear your browser cache</li>
          </ul>
        </div>

        {/* Support Info */}
        <div className="text-center text-pink-600">
          <p>If the problem persists, please contact our support team</p>
          <p className="text-sm mt-1">
            Reference ID: {Date.now().toString(36)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
