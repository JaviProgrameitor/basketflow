import React from 'react'

const steps = [
  { t: 'Crea tu torneo', d: 'Genera una carpeta para tu liga o campeonato.' },
  { t: 'Asocia equipos', d: 'Configura nombres personalizados, colores y staff.' },
  { t: 'Agrega jugadores', d: 'Gestiona fichas y dorsales por partido.' },
  { t: 'Programa partidos', d: 'Define fecha, hora, sede y oficiales.' },
  { t: 'Registra eventos', d: 'Carga puntos, faltas y tiempos muertos por periodo.' },
  { t: 'Consulta estadísticas', d: 'Analiza rendimientos por partido y por liga.' },
  { t: 'Arma playoffs', d: 'Genera semifinales y final según ranking.' },
  { t: 'Descarga reportes', d: 'Exporta la planilla oficial en PDF lista para imprimir.' },
]

function Steps() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Cómo funciona</h2>
          <p className="mt-2 text-gray-600">Un flujo claro de punta a punta, sin complicaciones.</p>
        </div>

        <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={i} className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-bold">
                  {i + 1}
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{s.t}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Steps