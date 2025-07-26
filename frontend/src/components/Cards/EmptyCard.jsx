import React from 'react';

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-10 w-full h-full">
      <div className="bg-cyan-200/60 p-10 rounded-full">
        <img src={imgSrc} alt="No Notes" className="w-24 h-24 object-contain" />
      </div>

      <p className="max-w-xl text-base sm:text-sm font-semibold text-slate-700 leading-7 mt-6">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
