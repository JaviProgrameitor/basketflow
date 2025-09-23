import React from 'react'
import { Link } from 'react-router'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-indigo-700 shadow ring-1 ring-indigo-100">
            BasketFlow · Gestión completa de ligas de básquet
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Organiza ligas, registra partidos y genera reportes oficiales
          </h1>
          <p className="mt-4 text-lg leading-7 text-gray-600">
            Administra torneos, equipos y jugadores. Controla eventos en vivo, obtén estadísticas automáticas,
            arma playoffs y descarga reportes PDF oficiales. Todo en una sola app.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/folders"
              className="inline-flex items-center rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              Comenzar ahora
            </Link>
            <Link
              to="/pay-license"
              className="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
            >
              Comprar licencia
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 text-xs text-gray-500">
            <div className="flex items-center justify-center gap-2"><span className="text-indigo-600">●</span> Registro de eventos</div>
            <div className="flex items-center justify-center gap-2"><span className="text-indigo-600">●</span> Estadísticas en tiempo real</div>
            <div className="flex items-center justify-center gap-2"><span className="text-indigo-600">●</span> Playoffs automáticos</div>
            <div className="flex items-center justify-center gap-2"><span className="text-indigo-600">●</span> Reportes PDF oficiales</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero