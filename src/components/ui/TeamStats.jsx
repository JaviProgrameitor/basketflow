import React, { useEffect, useState, useMemo } from 'react';
import LeaderboardCard from './LeaderboardCard.jsx';
import SkeletonLeaderboard from './SkeletonLeaderboard.jsx';
import {
  getFewerFoulsMadeTeamsByFolder,
  getFewerPointsAllowedTeamsByFolder,
  getTopScorersTeamsByFolder
} from '../../api/stats.js';

function TeamStats({ folderId }) {
  const [topScorersTeams, setTopScorersTeams] = useState([]);
  const [fewerPointsAllowedTeams, setFewerPointsAllowedTeams] = useState([]);
  const [fewerFoulsMadeTeams, setFewerFoulsMadeTeams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError('');
      const [scorers, fewerAllowed, fewerFouls] = await Promise.all([
        getTopScorersTeamsByFolder(folderId),
        getFewerPointsAllowedTeamsByFolder(folderId),
        getFewerFoulsMadeTeamsByFolder(folderId),
      ]);
      setTopScorersTeams(scorers || []);
      setFewerPointsAllowedTeams(fewerAllowed || []);
      setFewerFoulsMadeTeams(fewerFouls || []);
    } catch (e) {
      console.error('Error loading league team stats:', e);
      setError('No se pudieron cargar las estadísticas de equipos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  const topScorersItems = useMemo(() => {
    return (topScorersTeams || []).map((t) => ({
      id: t.team_id,
      name: t.team_custom_name?.trim() ? t.team_custom_name : t.team_name,
      value: Number(t.total_points_scored) || 0,
      colorHex: '#2563EB', // azul para “anotadores”
      caption: 'Puntos totales',
    }));
  }, [topScorersTeams]);

  const fewerPointsAllowedItems = useMemo(() => {
    return (fewerPointsAllowedTeams || []).map((t) => ({
      id: t.team_id,
      name: t.team_custom_name?.trim() ? t.team_custom_name : t.team_name,
      value: Number(t.total_points_against) || 0,
      colorHex: '#16A34A', // verde para “menos puntos permitidos”
      caption: 'Puntos en contra',
      lowerIsBetter: true,
    }));
  }, [fewerPointsAllowedTeams]);

  const fewerFoulsMadeItems = useMemo(() => {
    return (fewerFoulsMadeTeams || []).map((t) => ({
      id: t.team_id,
      name: t.team_custom_name?.trim() ? t.team_custom_name : t.team_name,
      value: Number(t.total_fouls) || 0,
      colorHex: '#EA580C', // naranja para “faltas”
      caption: 'Faltas cometidas',
      lowerIsBetter: true,
    }));
  }, [fewerFoulsMadeTeams]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SkeletonLeaderboard title="Más Anotadores" />
        <SkeletonLeaderboard title="Menos Puntos Permitidos" />
        <SkeletonLeaderboard title="Menos Faltas Cometidas" />
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
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <LeaderboardCard
        title="Más Anotadores (Equipos)"
        subtitle="Top 5 equipos con más puntos totales"
        items={topScorersItems}
        valueFormatter={(v) => `${v}`}
      />

      <LeaderboardCard
        title="Menos Puntos Permitidos"
        subtitle="Top 5 equipos con menos puntos en contra"
        items={fewerPointsAllowedItems}
        valueFormatter={(v) => `${v}`}
        invertProgress // muestra barra corta como “mejor”
      />

      <LeaderboardCard
        title="Menos Faltas Cometidas"
        subtitle="Top 5 equipos con menos faltas"
        items={fewerFoulsMadeItems}
        valueFormatter={(v) => `${v}`}
        invertProgress
      />
    </section>
  );
}

export default TeamStats;