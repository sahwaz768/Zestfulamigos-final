import React, { useState } from 'react';

const Pagination = () => {
  const [selectedPage, setSelectedPage] = useState(null);

  return (
    <>
      <div className="flex items-center justify-center space-x-2 pag-ination py-2">
        <button className="px-3 py-2 rounded-md bg-gray-200 text-gray-600">&lt;</button>

        <button
          onClick={() => setSelectedPage(1)}
          className={`px-3 py-2 rounded-md ${selectedPage === 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          1
        </button>
        <button
          onClick={() => setSelectedPage(2)}
          className={`px-3 py-2 rounded-md ${selectedPage === 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          2
        </button>
        <button
          onClick={() => setSelectedPage(3)}
          className={`px-3 py-2 rounded-md ${selectedPage === 3 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          3
        </button>
        <button
          onClick={() => setSelectedPage(4)}
          className={`px-3 py-2 rounded-md ${selectedPage === 4 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          4
        </button>

        <button className="px-3 py-2 rounded-md bg-gray-200 text-gray-600">&gt;</button>
      </div>
    </>
  );
};

export default Pagination;

