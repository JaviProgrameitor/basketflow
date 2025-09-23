import React from 'react';

function SkeletonLeaderboard({ title = 'Cargando…' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
      <div className="h-4 w-40 bg-gray-200 rounded" />
      <div className="mt-1 h-3 w-64 bg-gray-100 rounded" />
      <div className="mt-4 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-6 h-3 bg-gray-200 rounded" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-10 bg-gray-200 rounded" />
              </div>
              <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLeaderboard;