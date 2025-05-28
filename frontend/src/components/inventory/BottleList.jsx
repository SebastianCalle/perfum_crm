import React from 'react';

function BottleList({ bottles, isLoading, error, onRetry }) {
  if (isLoading) {
    return <p>Cargando botellas...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error al cargar botellas: {error}</p>
        {onRetry && <button onClick={onRetry}>Reintentar</button>}
      </div>
    );
  }

  return (
    <div>
      <h3>Lista de Botellas</h3>
      {bottles.length === 0 ? (
        <p>No hay botellas registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Capacidad (ml)</th>
              <th>Tipo</th>
              <th>Color</th>
              <th>Proveedor</th>
              <th>Costo (unidad)</th>
              <th>Stock (unidades)</th>
              <th>Stock Mín. (unidades)</th>
            </tr>
          </thead>
          <tbody>
            {bottles.map((bottle) => (
              <tr key={bottle.id /* Asumiendo que hay un id */}>
                <td>{bottle.name}</td>
                <td>{bottle.capacity_ml}</td>
                <td>{bottle.bottle_type}</td>
                <td>{bottle.color}</td>
                <td>{bottle.supplier_name}</td>
                <td>{bottle.cost_per_unit}</td>
                <td>{bottle.stock_units}</td>
                <td>{bottle.min_stock_units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BottleList; 