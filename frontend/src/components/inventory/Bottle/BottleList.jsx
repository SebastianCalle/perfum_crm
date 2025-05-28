import React from 'react';

// Componente presentacional para mostrar la lista de botellas con tabla elegante y sofisticada
function BottleList({ bottles, isLoading, error, onRetry }) {
  if (isLoading) {
    return <div className="p-4 text-center rounded-lg w-full" style={{ backgroundColor: '#2A2A2A', color: '#B8B8B8' }}>Cargando botellas...</div>;
  }

  if (error) {
    return (
      <div className="p-4 border rounded-md w-full" style={{ backgroundColor: '#3A1A1A', borderColor: '#5A2A2A', color: '#FF9999' }}>
        <p className="font-semibold">Error al cargar botellas:</p>
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

  if (bottles.length === 0) {
    return <div className="p-4 text-center rounded-lg w-full" style={{ backgroundColor: '#2A2A2A', color: '#B8B8B8' }}>No hay botellas registradas.</div>;
  }

  // Paleta de colores elegante y sofisticada para tema oscuro
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #3A3A3A',
    backgroundColor: '#2A2A2A',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
  };

  const thStyle = {
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '600',
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    border: '1px solid #4A4A4A',
    backgroundColor: '#3A3A3A',
    borderBottom: '2px solid #4A4A4A'
  };

  const tdStyle = {
    padding: '14px 20px',
    fontSize: '14px',
    color: '#B8B8B8',
    border: '1px solid #4A4A4A',
    backgroundColor: '#2A2A2A',
    transition: 'background-color 0.15s ease'
  };

  const tdFirstStyle = {
    ...tdStyle,
    fontWeight: '500',
    color: '#F5F5DC'
  };

  const tdNumberStyle = {
    ...tdStyle,
    textAlign: 'right',
    fontFamily: 'monospace',
    color: '#D4AF37'
  };

  const evenRowColor = '#2A2A2A';
  const oddRowColor = '#323232';
  const hoverColor = '#3A3A3A';

  return (
    <div className="overflow-x-auto w-full" style={{ backgroundColor: 'transparent' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Capacidad</th>
            <th style={thStyle}>Tipo</th>
            <th style={thStyle}>Color</th>
            <th style={thStyle}>Proveedor</th>
            <th style={thStyle}>Costo/Unidad</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Stock Mín.</th>
          </tr>
        </thead>
        <tbody>
          {bottles.map((bottle, index) => (
            <tr 
              key={bottle.id} 
              style={{ 
                backgroundColor: index % 2 === 0 ? evenRowColor : oddRowColor,
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = index % 2 === 0 ? evenRowColor : oddRowColor;
              }}
            >
              <td style={tdFirstStyle}>{bottle.name}</td>
              <td style={tdNumberStyle}>{bottle.capacity_ml}ml</td>
              <td style={tdStyle}>{bottle.bottle_type}</td>
              <td style={tdStyle}>{bottle.color}</td>
              <td style={tdStyle}>{bottle.supplier_name}</td>
              <td style={tdNumberStyle}>${bottle.cost_per_unit}</td>
              <td style={tdNumberStyle}>{bottle.stock_units} un.</td>
              <td style={tdNumberStyle}>{bottle.min_stock_units} un.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BottleList; 