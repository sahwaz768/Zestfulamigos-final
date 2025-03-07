import React, { useState } from 'react';

const Pagination = () => {
  const [selectedPage, setSelectedPage] = useState(2);
  return (
    <>
      <div className="flex items-center justify-center space-x-2  pag-ination py-2">
        <button
          className="px-3 py-2 rounded-md bg-gray-200 text-gray-600"
          onClick={() => setSelectedPage((prev) => Math.max(prev - 1, 1))}
        >
          &lt;
        </button>

        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            onClick={() => setSelectedPage(page)}
            className={`px-3 py-2 rounded-md ${
              selectedPage === page
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-2 rounded-md bg-gray-200 text-gray-600"
          onClick={() => setSelectedPage((prev) => Math.min(prev + 1, 4))}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default Pagination;
