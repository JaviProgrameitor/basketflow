import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { FiCalendar, FiPlus } from 'react-icons/fi';
import { useModal, useDoubleTap } from '../hooks';

import Modal from '../components/ui/Modal.jsx';
import ToolBarTeams from '../components/ui/ToolBarTeams.jsx';
import MainTeams from '../components/ui/MainTeams.jsx';
import HeaderView from '../components/ui/HeaderView.jsx';
import Form from '../components/form/Form.jsx';
import { addTeam } from '../api/team.js';
import { addFoldersTeams, getFoldersTeamsByFolderId, updateFoldersTeams } from '../api/foldersTeams.js';

const Teams = () => {
  // Navegación
  const navigate = useNavigate();
  const { onTouchEnd } = useDoubleTap();

  // Estados para controlar la vista activa
  const [searchQuery, setSearchQuery] = useState('');
  const { modalState, openModal, closeModal } = useModal({
    create: false,
    edit: false,
    delete: false,
    currentData: null
  });

  // ID de la carpeta desde la URL
  const { folder_id } = useParams();

  // Datos de ejemplo - equipos
  const [teams, setTeams] = useState([]);

  const fieldsForm = [
    {
      name: "name",
      label: "Nombre del equipo",
      type: "text",
      props: {
        placeholder: "Ej: Los campeones",
        required: true
      }
    },
    {
      name: 'coach',
      label: 'Entrenador',
      type: 'text',
      props: {
        placeholder: 'Ej: Juan Pérez',
        required: true
      }
    },
    {
      name: 'assistant_coach',
      label: 'Entrenador asistente',
      type: 'text',
      props: {
        placeholder: 'Ej: María López'
      }
    },
    {
      name: 'primary_color',
      label: 'Color primario',
      type: 'color',
      inputClassName: 'w-full h-10',
      defaultValue: '#3B82F6',
      props: {
        required: true
      }
    }
  ];

  // Agregar nuevo equipo
  const handleAddTeam = async (data) => {
    try {
      const newTeam = await addTeam(data.name);
      const newFolderTeam = await addFoldersTeams({
        folder_id,
        team_id: newTeam?.id,
        custom_name: '',
        ...data
      });
      fetchTeams();
    } catch (error) {
      // console.error('Error al agregar el equipo:', error);
      toast.error('Error al agregar el equipo', {
        duration: 3000
      });
    } finally {
      closeModal('create');
    }
  };

  // Editar equipo
  const handleEditTeam = async (data) => {
    try {
      const updateTeam = await updateFoldersTeams({
        folder_id: folder_id,
        team_id: modalState.currentData.team_id,
        custom_name: data.name,
        ...data
      });
      fetchTeams();
    } catch (error) {
      // console.error('Error al editar el equipo:', error);
      toast.error('Error al editar el equipo', {
        duration: 3000
      });
    } finally {
      closeModal('edit');
    }
  };

  // Filtrar equipos y partidos según búsqueda
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.assistant_coach.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const seePlayers = (type, team) => {
    const tap = onTouchEnd();
    if(type === 'touch' && tap.doubleTap) {
      navigate(`/players/${folder_id}/${team.team_id}`)
    }

    if(type === 'click') {
      navigate(`/players/${folder_id}/${team.team_id}`)
    }
  }

  const fetchTeams = async () => {
    try {
      const teams = await getFoldersTeamsByFolderId(folder_id);
      // console.log('Folder ID:', folder_id);
      // console.log('Equipos obtenidos:', teams);
      setTeams(teams);
    } catch (error) {
      // console.error('Error al obtener los equipos:', error);
      toast.error('Error al obtener los equipos', {
        duration: 3000
      });
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <HeaderView title="Equipos">
        <Link
          to={`/matches/${folder_id}`}
          className="flex items-center gap-2 button font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FiCalendar className="size-4 lg:size-5" />
          Ver Partidos
        </Link>
        <button
          onClick={() => openModal('create')}
          className="flex items-center gap-2 button font-medium text-white bg-green-600 hover:bg-green-700"
        >
          <FiPlus className="size-4 lg:size-5" />
          Nuevo Equipo
        </button>
      </HeaderView>

      {/* Toolbar */}
      <ToolBarTeams searchQuery={searchQuery} setSearchQuery={setSearchQuery} teams={teams} />

      {/* Main Content */}
      <MainTeams filteredTeams={filteredTeams} openModal={openModal} seePlayers={seePlayers} />

      {/* Modal para nuevo equipo */}
      <Modal
        isOpen={modalState.create}
        onClose={() => closeModal('create')}
        title="Nuevo Equipo"
      >
        <Form
          fields={fieldsForm}
          onSubmit={(values) => handleAddTeam(values)}
          submitLabel="Agregar Equipo"
          actionsRender={() => (
            <button
              type="button"
              className="button border-gray-300 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500"
              onClick={() => closeModal('create')}
            >
              Cancelar
            </button>
          )}
        />
      </Modal>

      {/* Modal para editar equipo */}
      <Modal
        isOpen={modalState.edit}
        onClose={() => closeModal('edit')}
        title="Editar Equipo"
      >
        <Form
          fields={fieldsForm}
          onSubmit={(values) => handleEditTeam(values)}
          initialValues={modalState.currentData}
          submitLabel="Guardar Cambios"
          actionsRender={() => (
            <button
              type="button"
              className="button border-gray-300 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500"
              onClick={() => closeModal('edit')}
            >
              Cancelar
            </button>
          )}
        />
      </Modal>
    </div>
  );
};

export default Teams;