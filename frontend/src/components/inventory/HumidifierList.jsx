import React from 'react';

function HumidifierList({ humidifiers, isLoading, error, onRetry }) {
  if (isLoading) {
    return <p>Cargando humidificadores...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error al cargar humidificadores: {error}</p>
        {onRetry && <button onClick={onRetry}>Reintentar</button>}
      </div>
    );
  }

  return (
    <div>
      <h3>Lista de Humidificadores</h3>
      {humidifiers.length === 0 ? (
        <p>No hay humidificadores registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Proveedor</th>
              <th>Costo (unidad)</th>
              <th>Stock (unidades)</th>
              <th>Stock Mín. (unidades)</th>
            </tr>
          </thead>
          <tbody>
            {humidifiers.map((humidifier) => (
              <tr key={humidifier.id}>
                <td>{humidifier.name}</td>
                <td>{humidifier.description}</td>
                <td>{humidifier.supplier_name}</td>
                <td>{humidifier.cost_per_unit}</td>
                <td>{humidifier.stock_units}</td>
                <td>{humidifier.min_stock_units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HumidifierList; 