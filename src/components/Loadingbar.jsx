'use client';
import React, { useEffect, useState } from 'react';

const Loadingbar = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 10);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div
          className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.05s linear'
          }}
        />
        <p className="mt-4 text-red-600 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loadingbar;
