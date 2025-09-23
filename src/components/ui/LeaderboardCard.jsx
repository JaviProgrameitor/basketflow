import React, { useMemo } from 'react';

function LeaderboardCard({
  title,
  subtitle,
  items = [],
  valueFormatter = (v) => v,
  invertProgress = false, // si true, valores bajos muestran barra “mejor”
}) {
  // normalización para barras (0..1)
  const { maxValue, minValue } = useMemo(() => {
    if (!items.length) return { maxValue: 1, minValue: 0 };
    let max = Math.max(...items.map((i) => i.value ?? 0));
    let min = Math.min(...items.map((i) => i.value ?? 0));
    if (max === min) max = min + 1; // evitar división por cero
    return { maxValue: max, minValue: min };
  }, [items]);

  const getProgress = (v) => {
    if (invertProgress) {
      // valores más bajos => mejor (barra más larga)
      return Math.max(0.1, (maxValue - (v ?? 0)) / (maxValue - minValue));
    }
    return Math.max(0.1, ((v ?? 0) - minValue) / (maxValue - minValue));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item, idx) => (
          <div key={item.id ?? idx} className="flex items-center gap-3">
            <div className="w-6 text-xs text-gray-500 text-right">{idx + 1}</div>

            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Indicador de color */}
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.colorHex || '#64748B' }}
                  />
                  <div className="truncate font-medium text-sm text-gray-900">{item.name}</div>
                  {item.helper && (
                    <span className="truncate text-xs text-gray-500">({item.helper})</span>
                  )}
                </div>
                <div className="ml-2 flex items-center gap-2">
                  {item.trailingNote && (
                    <span className="text-[11px] text-gray-500">{item.trailingNote}</span>
                  )}
                  <span className="text-sm font-semibold tabular-nums">
                    {valueFormatter(item.value)}
                  </span>
                </div>
              </div>

              <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${getProgress(item.value) * 100}%`,
                    background: item.colorHex || '#64748B',
                    opacity: 0.9,
                  }}
                />
              </div>

              {item.caption && (
                <div className="mt-1 text-[11px] text-gray-500">{item.caption}</div>
              )}
            </div>
          </div>
        ))}

        {!items.length && (
          <div className="text-sm text-gray-500 py-6 text-center">No hay datos para mostrar.</div>
        )}
      </div>
    </div>
  );
}

export default LeaderboardCard;