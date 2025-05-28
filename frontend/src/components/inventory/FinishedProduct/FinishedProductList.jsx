import React from 'react';

function FinishedProductList({ finishedProducts, isLoading, error, onRetry }) {
  if (isLoading) {
    return <p>Cargando productos terminados...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error al cargar productos terminados: {error}</p>
        {onRetry && <button onClick={onRetry}>Reintentar</button>}
      </div>
    );
  }

  return (
    <div>
      <h3>Lista de Productos Terminados</h3>
      {finishedProducts.length === 0 ? (
        <p>No hay productos terminados registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Tamaño (ml/g)</th>
              <th>Proveedor</th>
              <th>Costo</th>
              <th>Precio Venta</th>
              <th>Stock</th>
              <th>Stock Mínimo</th>
              {/* Timestamps can be added if needed: product.created_at, product.updated_at */}
            </tr>
          </thead>
          <tbody>
            {finishedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.product_type}</td>
                <td>{product.description || 'N/A'}</td>
                <td>{product.size_ml_g || 'N/A'}</td>
                <td>{product.supplier_name || 'N/A'}</td>
                <td>{product.cost_price}</td>
                <td>{product.sale_price}</td>
                <td>{product.stock_units}</td>
                <td>{product.min_stock_units === null || product.min_stock_units === undefined ? 'N/A' : product.min_stock_units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FinishedProductList; 