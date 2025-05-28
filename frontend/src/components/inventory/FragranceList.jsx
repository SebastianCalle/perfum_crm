import React from 'react';

// Componente presentacional para mostrar la lista de fragancias
function FragranceList({ fragrances, isLoading, error, onRetry }) {
  if (isLoading) {
    return <p>Cargando fragancias...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error al cargar fragancias: {error}</p>
        {onRetry && <button onClick={onRetry}>Reintentar</button>}
      </div>
    );
  }

  return (
    <div>
      <h2>Lista de Fragancias</h2>
      {fragrances.length === 0 ? (
        <p>No hay fragancias registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre Interno</th>
              <th>Nombre Inspiración</th>
              <th>Casa</th>
              <th>Costo (g)</th>
              <th>Stock (g)</th>
              <th>Stock Mín. (g)</th>
            </tr>
          </thead>
          <tbody>
            {fragrances.map((fragrance) => (
              <tr key={fragrance.id /* Asumiendo que hay un id */}>
                <td>{fragrance.internal_name}</td>
                <td>{fragrance.inspiration_name}</td>
                <td>{fragrance.house}</td>
                <td>{fragrance.cost_per_g}</td>
                <td>{fragrance.stock_g}</td>
                <td>{fragrance.min_stock_g}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FragranceList; 