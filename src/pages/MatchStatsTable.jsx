
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { calculatePoints } from "../helpers/match.js";
import dayjs from "dayjs";
import 'dayjs/locale/es'; // Importar el locale español si es necesario

import HeaderView from "../components/ui/HeaderView.jsx";
import MainMatchStatsTable from "../components/ui/MainMatchStatsTable.jsx";
import { getStatsByMatch } from "../api/stats.js";
import { generateOfficialGameReport, getStatsMatchForReportByMatchId } from "../api/reports.js";
import { getMatchPlayers } from "../api/matchPlayers.js";
import { getDeletedMatchEventsByMatchId, getMatchEventsByMatchId } from "../api/matchEvents.js";
import Spinner from "../components/common/Spinner.jsx";
import { toast, Toaster } from "sonner";

function MatchStatsTable() {
  const { match_id, folder_id } = useParams();

  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [matchStats, setMatchStats] = useState([]);

  const [sortBy, setSortBy] = useState('points');

  // Ordena jugadores por puntos o faltas descendente
  const sortedPlayers = useMemo(() => {
    const arr = [...matchStats];
    arr.sort((a, b) => (sortBy === "points"
      ? b.points - a.points || b.fouls - a.fouls
      : b.fouls - a.fouls || b.points - a.points
    ));
    return arr;
  }, [matchStats, sortBy]);

  const columns = [
    {
      header: "N°",
      accessor: "jersey_number",
      // cellClassName: "bg-red-100",
      render: (row) => row.jersey_number || row.player_number
    },
    {
      header: "Nombre del Jugador",
      accessor: "player_name"
    },
    {
      header: "Equipo",
      accessor: "team_name",
      render: (row) => <span style={{ color: row.team_color }}>{row.team_custom_name || row.team_name}</span>
    },
    {
      header: "Puntos",
      accessor: "points",
      // onClick: (row) => {
      //   if(row.quarter_1) {
      //     openModal('addPoint', { id: row.id, type: 'quarter_1' });
      //   }
      // }
    },
    {
      header: 'Puntos Simples',
      accessor: 'points_simple',
    },
    {
      header: 'Puntos Dobles',
      accessor: 'points_double',
    },
    {
      header: 'Puntos Triples',
      accessor: 'points_triple',
    },
    {
      header: "Faltas",
      accessor: "fouls",
    },
  ];

  const handleGetStatsByMatch = async () => {
    try {
      const stats = await getStatsByMatch(match_id);
      setMatchStats(stats);
    } catch (error) {
      console.error("Error fetching match stats:", error);
    }
  }

  const handleGenerateOfficialGameReport = async () => {
    setIsLoadingCustom(true);
    try {
      let [dataMatch, players, matchEvents, deletedMatchEvents] = await Promise.all([
        getStatsMatchForReportByMatchId(match_id),
        getMatchPlayers(match_id),
        getMatchEventsByMatchId(match_id),
        getDeletedMatchEventsByMatchId(match_id)
      ]);
      const pointsHome = calculatePoints(matchEvents.filter(event => event.team_id === dataMatch.home_team_id && event.event_type === 'point'));
      const foulsHome = matchEvents.filter(event => event.team_id === dataMatch.home_team_id && event.event_type === 'foul');
      const timeoutsHome = matchEvents.filter(event => event.team_id === dataMatch.home_team_id && event.event_type === 'timeout');
      const pointsAway = calculatePoints(matchEvents.filter(event => event.team_id === dataMatch.away_team_id && event.event_type === 'point'));
      const foulsAway = matchEvents.filter(event => event.team_id === dataMatch.away_team_id && event.event_type === 'foul');
      const timeoutsAway = matchEvents.filter(event => event.team_id === dataMatch.away_team_id && event.event_type === 'timeout');

      dataMatch.date = dayjs(dataMatch.date).format('DD/MM/YYYY')
      dataMatch.players = players;
      dataMatch.pointsHome = pointsHome;
      dataMatch.foulsHome = foulsHome;
      dataMatch.timeoutsHome = timeoutsHome;
      dataMatch.pointsAway = pointsAway;
      dataMatch.foulsAway = foulsAway;
      dataMatch.timeoutsAway = timeoutsAway;
      dataMatch.deletedMatchEvents = deletedMatchEvents;

      const pdf = await generateOfficialGameReport(match_id, dataMatch);

      const blobPdf = new Blob([pdf.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blobPdf);
      const a = document.createElement('a');
      a.download = `${dataMatch.home_team_name} vs ${dataMatch.away_team_name}.pdf`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setIsLoadingCustom(false);
    } catch (error) {
      setIsLoadingCustom(false);
      console.error("Error generando el PDF:", error);
      toast.error('Error generando el PDF', {
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    handleGetStatsByMatch();
  }, []);

  return (
    <div className="h-screen overflow-x-hidden">
      <Toaster position="top-center" richColors />
      {/* Header */}
      <HeaderView title="Estadísticas del Partido" back={`/matches/${folder_id}`}>
        <button
          onClick={handleGenerateOfficialGameReport}
          className="flex items-center button text-white bg-green-600 hover:bg-green-700 focus:ring-green-500"
        >
          {isLoadingCustom ? (
            <>
              <Spinner />
              Generando...
            </>
          ) : (
            'Generar Reporte'
          )}
          
        </button>
        <Link
          to={`/match-events-timeline/${match_id}/${folder_id}`}
          className="flex items-center button text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
        >
          Ver Línea de Tiempo
        </Link>
      </HeaderView>

      {/* Main */}
      <MainMatchStatsTable
        setSortBy={setSortBy}
        sortBy={sortBy}
        columns={columns}
        sortedPlayers={sortedPlayers}
      />
    </div>
  );
}

export default MatchStatsTable;