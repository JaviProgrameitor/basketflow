import React from 'react'
import { Link } from 'react-router'

function Pricing() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Licencias</h2>
          <p className="mt-2 text-gray-600">Todo lo esencial en la versión gratuita. Desbloquea todo el poder con la Licencia.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Gratis</h3>
              <span className="text-xs rounded-full bg-gray-100 px-2 py-1 text-gray-700">Incluye lo esencial</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">Ideal para comenzar y probar el flujo completo de partidos.</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• Gestión de torneos, equipos y jugadores</li>
              <li>• Partidos de liga, periodos y últimos 4 minutos</li>
              <li>• Registro de puntos, faltas y tiempos muertos</li>
              <li>• Estadísticas de partido y línea de tiempo</li>
            </ul>
            <div className="mt-6">
              <Link
                to="/folders"
                className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
              >
                Empezar gratis
              </Link>
            </div>
          </div>

          {/* Pro / Licensed */}
          <div className="relative rounded-2xl border-2 border-indigo-600 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Licencia</h3>
              <span className="text-xs rounded-full bg-indigo-100 px-2 py-1 text-indigo-700">Completo</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">Para ligas serias: automatización, reportes y estadísticas avanzadas.</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• Todo lo de la versión Gratis</li>
              <li>• Estadísticas de liga avanzadas y rankings</li>
              <li>• Playoffs automáticos (semis y final) y series Best-of</li>
              <li>• Creación de partidos para series y actualización de series</li>
              <li>• Reporte oficial del partido en PDF (template propio)</li>
              <li>• Personalización avanzada por torneo (nombres, colores, dorsales por partido)</li>
              <li>• Autenticación, licencia y vínculo de dispositivo</li>
              <li>• Preparado para sincronización y respaldo</li>
              <li>• Soporte y actualizaciones</li>
            </ul>
            <div className="mt-6">
              <Link
                to="/license"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Comprar licencia
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Nota: Ajusta los límites y alcances según tu política de licencias actual.
        </p>
      </div>
    </section>
  )
}

export default Pricing