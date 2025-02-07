import React from 'react';

const Custom404 = () => {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Number */}
        <h1 className="text-pink-600 font-bold text-9xl animate-pulse">404</h1>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-pink-800">
            Page Not Found
          </h2>
          <p className="text-pink-700">
            Oops! The page you're looking for seems to have gone on vacation.
            Let's get you back home.
          </p>
        </div>

        {/* Decorative Element */}
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-pink-300 rounded-full"></div>
        </div>

        {/* Back Button with Custom Arrow SVG */}
        <button
          className="inline-flex items-center px-6 py-3 text-pink-700 bg-pink-100 rounded-lg 
                     hover:bg-pink-200 transition-colors duration-200 gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Go Back
        </button>

        {/* Additional Help Text */}
        <p className="text-sm text-pink-600">
          If you think this is a mistake, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Custom404;
