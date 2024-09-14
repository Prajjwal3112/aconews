// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`p-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
