import React from 'react';

export const EventCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm animate-pulse flex flex-col justify-between">
      <div>
        <div className="h-56 bg-slate-200 w-full relative">
          <div className="absolute top-4 left-4 h-6 w-24 bg-slate-300 rounded-full" />
          <div className="absolute top-4 right-4 h-6 w-20 bg-slate-300 rounded-full" />
        </div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-slate-200 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 rounded w-1/2" />
            <div className="h-4 bg-slate-100 rounded w-2/3" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-slate-100 rounded w-full" />
            <div className="h-3 bg-slate-100 rounded w-5/6" />
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl space-y-2 border border-slate-100">
            <div className="h-3 bg-slate-200 rounded w-1/3" />
            <div className="h-5 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 flex gap-2">
        <div className="h-10 bg-slate-200 rounded-xl flex-1" />
        <div className="h-10 bg-slate-200 rounded-xl w-28" />
      </div>
    </div>
  );
};

export const EventGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <EventCardSkeleton key={idx} />
      ))}
    </div>
  );
};

