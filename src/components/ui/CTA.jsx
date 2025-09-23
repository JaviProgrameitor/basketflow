import React from 'react'
import { Link } from 'react-router'

function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-indigo-700 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Listo para llevar tu liga al próximo nivel
          </h2>
          <p className="mt-2 text-indigo-100">
            Organiza, registra y analiza como un profesional. Activa la licencia para desbloquear
            estadísticas avanzadas, playoffs automáticos y reportes oficiales en PDF.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/folders"
              className="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50"
            >
              Empezar ahora
            </Link>
            <Link
              to="/pay-license"
              className="inline-flex items-center rounded-md bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
            >
              Comprar licencia
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA