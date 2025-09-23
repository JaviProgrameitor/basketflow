import React from 'react'
import { Link } from 'react-router'

const features = [
  {
    title: 'Gestión de Torneos (Carpetas)',
    desc: 'Crea carpetas/torneos y organiza toda la competencia desde un solo lugar.',
    href: '/folders',
    badge: 'Core',
  },
  {
    title: 'Equipos por Torneo',
    desc: 'Asocia equipos a un torneo con nombre personalizado, coach, asistente y color primario.',
    href: '/folders',
    badge: 'Core',
  },
  {
    title: 'Jugadores y dorsales',
    desc: 'Administra jugadores y dorsal por partido (override por match). Controla participación.',
    href: '/folders',
    badge: 'Core',
  },
  {
    title: 'Partidos de Liga y Playoffs',
    desc: 'Programa partidos, registra ubicación y oficiales, actualiza periodos y últimos 4 minutos.',
    href: '/matches',
    badge: 'Core',
  },
  {
    title: 'Eventos en Vivo',
    desc: 'Registra puntos (1/2/3), faltas y tiempos muertos por periodo y minuto. Soft-delete con causa.',
    href: '/match-events-timeline',
    badge: 'Core',
  },
  {
    title: 'Estadísticas de Partido',
    desc: 'Puntos totales y por tipo, faltas, dorsal efectivo y más, todo calculado automáticamente.',
    href: '/stats',
    badge: 'Core',
  },
  {
    title: 'Estadísticas de Liga',
    desc: 'Tabla general (PJ, PG, PP, PF, PC, Dif), top anotadores, menos puntos en contra y menos faltas.',
    href: '/league-stats',
    badge: 'Pro',
  },
  {
    title: 'Playoffs Automáticos',
    desc: 'Genera semifinales (1 vs 4, 2 vs 3) y Final según ranking. Crea partidos de series y actualiza estado.',
    href: '/playoffs',
    badge: 'Pro',
  },
  {
    title: 'Reporte Oficial en PDF',
    desc: 'Genera la planilla oficial del partido en PDF con tu template, lista para imprimir.',
    href: '/reports',
    badge: 'Pro',
  },
  {
    title: 'Línea de Tiempo',
    desc: 'Visualiza la secuencia de eventos del partido con detalles por equipo y periodo.',
    href: '/match-events-timeline',
    badge: 'Pro',
  },
  {
    title: 'Sincronización y Dispositivo',
    desc: 'Autenticación, licencia, device token y preparación para sincronización/backup.',
    href: '/settings',
    badge: 'Pro',
  },
  {
    title: 'Roles y Oficiales',
    desc: 'Configura árbitros, anotadores y operadores de reloj por partido.',
    href: '/matches',
    badge: 'Core',
  },
]

function FeatureGrid() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Todo lo que necesitas para gestionar tu liga
          </h2>
          <p className="mt-2 text-gray-600">
            Desde la creación del torneo hasta el reporte oficial del partido.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <div key={idx} className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
                {/* <span className={`text-[10px] px-2 py-0.5 rounded-full ${f.badge === 'Pro' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                  {f.badge}
                </span> */}
              </div>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              {/* {f.href && (
                <Link to={f.href} className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  Ver sección →
                </Link>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureGrid