import React from 'react';

function AdditiveList({ additives, isLoading, error, onRetry }) {
  if (isLoading) {
    return <p>Cargando aditivos...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error al cargar aditivos: {error}</p>
        {onRetry && <button onClick={onRetry}>Reintentar</button>}
      </div>
    );
  }

  return (
    <div>
      <h3>Lista de Aditivos/Potenciadores</h3>
      {additives.length === 0 ? (
        <p>No hay aditivos registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Proveedor</th>
              <th>Costo Unit. Compra</th>
              <th>Vol. Unit. Compra (ml)</th>
              <th>Costo Estimado/Aplicación</th>
              <th>Notas Stock</th>
            </tr>
          </thead>
          <tbody>
            {additives.map((additive) => (
              <tr key={additive.id /* Asumiendo que hay un id */}>
                <td>{additive.name}</td>
                <td>{additive.type}</td>
                <td>{additive.description}</td>
                <td>{additive.supplier_name}</td>
                <td>{additive.purchase_unit_cost}</td>
                <td>{additive.purchase_unit_volume_ml}</td>
                <td>{additive.cost_per_application_estimate}</td>
                <td>{additive.stock_notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdditiveList; 