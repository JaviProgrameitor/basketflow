import React, { useEffect, useMemo, useState } from 'react';
import LeaderboardCard from './LeaderboardCard.jsx';
import SkeletonLeaderboard from './SkeletonLeaderboard.jsx';
import {
  getPointsPerGameByFolder,
  getThreePointersMadeByFolder
} from '../../api/stats.js';

function PlayerStats({ folderId }) {
  const [pointsPerGame, setPointsPerGame] = useState([]);
  const [threePointersMade, setThreePointersMade] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError('');
      const [ppg, tpm] = await Promise.all([
        getPointsPerGameByFolder(folderId),
        getThreePointersMadeByFolder(folderId),
      ]);
      setPointsPerGame(ppg || []);
      setThreePointersMade(tpm || []);
    } catch (e) {
      console.error('Error loading league player stats:', e);
      setError('No se pudieron cargar las estadísticas de jugadores. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  const ppgItems = useMemo(() => {
    return (pointsPerGame || []).map((p) => ({
      id: p.player_id,
      name: p.player_name,
      helper: p.team_custom_name?.trim() ? p.team_custom_name : p.team_name,
      value: Number(p.avg_points_per_game) || 0,
      colorHex: '#7C3AED', // violeta para PPG
      caption: 'PPG',
      trailingNote: `${p.games_played ?? 0} PJ`,
    }));
  }, [pointsPerGame]);

  const tpmItems = useMemo(() => {
    return (threePointersMade || []).map((p) => ({
      id: p.player_id,
      name: p.player_name,
      helper: p.team_custom_name?.trim() ? p.team_custom_name : p.team_name,
      value: Number(p.triples_made) || 0,
      colorHex: '#DC2626', // rojo para triples
      caption: 'Triples',
    }));
  }, [threePointersMade]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonLeaderboard title="Puntos por Partido (Jugadores)" />
        <SkeletonLeaderboard title="Triples Anotados (Jugadores)" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-red-100 text-red-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm">{error}</p>
          <button onClick={fetchAll} className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LeaderboardCard
        title="Puntos por Partido (Jugadores)"
        subtitle="Top 5 promedios de puntos por partido"
        items={ppgItems}
        valueFormatter={(v) => v.toFixed(2)}
      />

      <LeaderboardCard
        title="Triples Anotados (Jugadores)"
        subtitle="Top 5 máximos tripleros"
        items={tpmItems}
        valueFormatter={(v) => `${v}`}
      />
    </section>
  );
}

export default PlayerStats;