import React from 'react';
import TeamStats from './TeamStats.jsx';
import PlayerStats from './PlayerStats.jsx';

function MainLeagueStats({ componentActive, setComponentActive, folderId }) {
  return (
    <main className="p-6 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Tabs estilo “pills” */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100 w-max">
          <button
            onClick={() => setComponentActive('teams')}
            className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition ${
              componentActive === 'teams'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Equipos
          </button>
          <button
            onClick={() => setComponentActive('players')}
            className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition ${
              componentActive === 'players'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Jugadores
          </button>
        </div>

        {/* Contenido */}
        <div className="mt-6 space-y-8">
          {componentActive === 'teams' && <TeamStats folderId={folderId} />}
          {componentActive === 'players' && <PlayerStats folderId={folderId} />}
        </div>
      </div>
    </main>
  );
}

export default MainLeagueStats;