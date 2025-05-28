import React from 'react';

function AlcoholList({ alcohols, isLoading, error, onRetry }) {
  if (isLoading) {
    return <p>Cargando tipos de alcohol...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error al cargar alcoholes: {error}</p>
        {onRetry && <button onClick={onRetry}>Reintentar</button>}
      </div>
    );
  }

  return (
    <div>
      <h3>Lista de Alcoholes</h3>
      {alcohols.length === 0 ? (
        <p>No hay tipos de alcohol registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre (Tipo)</th>
              <th>Descripción</th>
              <th>Proveedor</th>
              <th>Fecha Compra</th>
              <th>Costo Unit. Compra</th>
              <th>Vol. Unit. Compra (ml)</th>
              <th>Costo/ml</th>
              <th>Notas Stock</th>
            </tr>
          </thead>
          <tbody>
            {alcohols.map((alcohol) => (
              <tr key={alcohol.id /* Asumiendo que hay un id */}>
                <td>{alcohol.name}</td>
                <td>{alcohol.description}</td>
                <td>{alcohol.supplier_name}</td>
                <td>{alcohol.purchase_date ? new Date(alcohol.purchase_date).toLocaleDateString() : 'N/A'}</td>
                <td>{alcohol.purchase_unit_cost}</td>
                <td>{alcohol.purchase_unit_volume_ml}</td>
                <td>{alcohol.cost_per_ml}</td>
                <td>{alcohol.stock_notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AlcoholList; 