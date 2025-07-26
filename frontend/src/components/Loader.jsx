import React from 'react';

const Loader = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[600px] w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500 mb-4"></div>
    <p className="text-cyan-700 text-lg font-medium">{message}</p>
  </div>
);

export default Loader; 