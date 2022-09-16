import React from 'react';

const QrCodeVCardSkeleton = () => {
  return (
    <section className="w-fit h-fit p-3 text-center bg-blue-400/90 rounded-2xl">
      <div className="shadow animate-pulse rounded-xl bg-gray-700/40 text-transparent w-[256px] h-[256px]" />
      <footer className="my-4">
        <h1 className="text-4xl text-transparent">
          -<span className="shadow animate-pulse rounded-xl bg-gray-700/40"></span>-
        </h1>
        <h2 className="text-2xl shadow animate-pulse rounded-xl bg-gray-700/40 text-transparent">
          Phone
        </h2>
      </footer>
    </section>
  );
};

export { QrCodeVCardSkeleton };
