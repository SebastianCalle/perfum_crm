import React from 'react';

// Componente presentacional para mostrar la lista de fragancias con tabla elegante y sofisticada
function FragranceList({ fragrances, isLoading, error, onRetry }) {
  if (isLoading) {
    return <div className="p-4 text-center text-primary-600 bg-light rounded-lg w-full">Cargando fragancias...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-300 text-red-700 rounded-md w-full">
        <p className="font-semibold">Error al cargar fragancias:</p>
        <p>{typeof error === 'object' ? JSON.stringify(error) : error}</p>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  if (fragrances.length === 0) {
    return <div className="p-4 text-center text-primary-600 bg-light rounded-lg w-full">No hay fragancias registradas.</div>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse bg-white border border-primary-200 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-light border-b-2 border-primary-300">
            <th className="px-5 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider border border-primary-200">
              Nombre Interno
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider border border-primary-200">
              Nombre Inspiración
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider border border-primary-200">
              Casa
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider border border-primary-200">
              Costo (g)
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider border border-primary-200">
              Stock (g)
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider border border-primary-200">
              Stock Mín. (g)
            </th>
          </tr>
        </thead>
        <tbody>
          {fragrances.map((fragrance, index) => (
            <tr 
              key={fragrance.id} 
              className={`transition-colors duration-150 hover:bg-accent hover:bg-opacity-20 ${
                index % 2 === 0 ? 'bg-white' : 'bg-light bg-opacity-50'
              }`}
            >
              <td className="px-5 py-3.5 text-sm font-medium text-primary-900 border border-primary-100">
                {fragrance.internal_name}
              </td>
              <td className="px-5 py-3.5 text-sm text-primary-600 border border-primary-100">
                {fragrance.inspiration_name}
              </td>
              <td className="px-5 py-3.5 text-sm text-primary-600 border border-primary-100">
                {fragrance.house}
              </td>
              <td className="px-5 py-3.5 text-sm text-right font-mono text-primary-600 border border-primary-100">
                ${fragrance.cost_per_g}
              </td>
              <td className="px-5 py-3.5 text-sm text-right font-mono text-primary-600 border border-primary-100">
                {fragrance.stock_g}g
              </td>
              <td className="px-5 py-3.5 text-sm text-right font-mono text-primary-600 border border-primary-100">
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