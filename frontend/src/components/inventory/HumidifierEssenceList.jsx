import React from 'react';

function HumidifierEssenceList({ humidifierEssences, isLoading, error, onRetry }) {
  if (isLoading) {
    return <p>Cargando esencias para humidificador...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error al cargar esencias: {error}</p>
        {onRetry && <button onClick={onRetry}>Reintentar</button>}
      </div>
    );
  }

  return (
    <div>
      <h3>Lista de Esencias para Humidificador</h3>
      {humidifierEssences.length === 0 ? (
        <p>No hay esencias registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Proveedor</th>
              <th>Costo (Botella)</th>
              <th>Vol. Botella (ml)</th>
              <th>Stock (unidades)</th>
              <th>Stock Mín. (unidades)</th>
            </tr>
          </thead>
          <tbody>
            {humidifierEssences.map((essence) => (
              <tr key={essence.id}>
                <td>{essence.name}</td>
                <td>{essence.description}</td>
                <td>{essence.supplier_name}</td>
                <td>{essence.cost_per_bottle}</td>
                <td>{essence.bottle_volume_ml}</td>
                <td>{essence.stock_units}</td>
                <td>{essence.min_stock_units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HumidifierEssenceList; 