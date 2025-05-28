import React from 'react';

// Componente presentacional para mostrar la lista de fragancias con tabla elegante y sofisticada
function FragranceList({ fragrances, isLoading, error, onRetry }) {
  if (isLoading) {
    return <div className="p-4 text-center text-primary-600 rounded-lg w-full" style={{ backgroundColor: '#2A2A2A', color: '#B8B8B8' }}>Cargando fragancias...</div>;
  }

  if (error) {
    return (
      <div className="p-4 border text-red-700 rounded-md w-full" style={{ backgroundColor: '#3A1A1A', borderColor: '#5A2A2A', color: '#FF9999' }}>
        <p className="font-semibold">Error al cargar fragancias:</p>
        <p>{typeof error === 'object' ? JSON.stringify(error) : error}</p>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="mt-2 px-4 py-2 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            style={{ backgroundColor: '#CC4444' }}
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  if (fragrances.length === 0) {
    return <div className="p-4 text-center rounded-lg w-full" style={{ backgroundColor: '#2A2A2A', color: '#B8B8B8' }}>No hay fragancias registradas.</div>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: '#2A2A2A', borderColor: '#3A3A3A' }}>
        <thead>
          <tr className="border-b-2" style={{ backgroundColor: '#3A3A3A', borderColor: '#4A4A4A' }}>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider border" style={{ color: '#D4AF37', borderColor: '#4A4A4A' }}>
              Nombre Interno
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider border" style={{ color: '#D4AF37', borderColor: '#4A4A4A' }}>
              Nombre Inspiración
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider border" style={{ color: '#D4AF37', borderColor: '#4A4A4A' }}>
              Casa
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider border" style={{ color: '#D4AF37', borderColor: '#4A4A4A' }}>
              Costo (g)
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider border" style={{ color: '#D4AF37', borderColor: '#4A4A4A' }}>
              Stock (g)
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider border" style={{ color: '#D4AF37', borderColor: '#4A4A4A' }}>
              Stock Mín. (g)
            </th>
          </tr>
        </thead>
        <tbody>
          {fragrances.map((fragrance, index) => (
            <tr 
              key={fragrance.id} 
              className="transition-colors duration-150 hover:bg-opacity-20"
              style={{ 
                backgroundColor: index % 2 === 0 ? '#2A2A2A' : '#323232',
                ':hover': { backgroundColor: '#3A3A3A' }
              }}
              onMouseEnter={(e) => e.target.parentElement.style.backgroundColor = '#3A3A3A'}
              onMouseLeave={(e) => e.target.parentElement.style.backgroundColor = index % 2 === 0 ? '#2A2A2A' : '#323232'}
            >
              <td className="px-5 py-3.5 text-sm font-medium border" style={{ color: '#F5F5DC', borderColor: '#4A4A4A' }}>
                {fragrance.internal_name}
              </td>
              <td className="px-5 py-3.5 text-sm border" style={{ color: '#D4AF37', borderColor: '#4A4A4A' }}>
                {fragrance.inspiration_name}
              </td>
              <td className="px-5 py-3.5 text-sm border" style={{ color: '#B8B8B8', borderColor: '#4A4A4A' }}>
                {fragrance.house}
              </td>
              <td className="px-5 py-3.5 text-sm text-right font-mono border" style={{ color: '#D4AF37', borderColor: '#4A4A4A' }}>
                ${fragrance.cost_per_g}
              </td>
              <td className="px-5 py-3.5 text-sm text-right font-mono border" style={{ color: '#B8B8B8', borderColor: '#4A4A4A' }}>
                {fragrance.stock_g}g
              </td>
              <td className="px-5 py-3.5 text-sm text-right font-mono border" style={{ color: '#B8B8B8', borderColor: '#4A4A4A' }}>
                {fragrance.min_stock_g}g
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FragranceList; 