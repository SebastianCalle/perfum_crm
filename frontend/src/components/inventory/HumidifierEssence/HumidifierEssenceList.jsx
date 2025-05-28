import React from 'react';

// Componente presentacional para mostrar la lista de esencias de humidificador con tabla elegante y sofisticada
function HumidifierEssenceList({ humidifierEssences, isLoading, error, onRetry }) {
  if (isLoading) {
    return <div className="p-4 text-center text-gray-600 bg-gray-50 rounded-lg w-full">Cargando esencias de humidificador...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-300 text-red-700 rounded-md w-full">
        <p className="font-semibold">Error al cargar esencias de humidificador:</p>
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

  if (humidifierEssences.length === 0) {
    return <div className="p-4 text-center text-gray-600 bg-gray-50 rounded-lg w-full">No hay esencias de humidificador registradas.</div>;
  }

  // Paleta de colores elegante y sofisticada
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  const thStyle = {
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    borderBottom: '2px solid #d1d5db'
  };

  const tdStyle = {
    padding: '14px 20px',
    fontSize: '14px',
    color: '#4b5563',
    border: '1px solid #f3f4f6',
    backgroundColor: '#ffffff',
    transition: 'background-color 0.15s ease'
  };

  const tdFirstStyle = {
    ...tdStyle,
    fontWeight: '500',
    color: '#1f2937'
  };

  const tdNumberStyle = {
    ...tdStyle,
    textAlign: 'right',
    fontFamily: 'monospace',
    color: '#6b7280'
  };

  const evenRowColor = '#ffffff';
  const oddRowColor = '#f8fafc';
  const hoverColor = '#f1f5f9';

  return (
    <div className="overflow-x-auto w-full" style={{ backgroundColor: 'transparent' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Proveedor</th>
            <th style={thStyle}>Costo/Botella</th>
            <th style={thStyle}>Vol. Botella</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Stock Mín.</th>
          </tr>
        </thead>
        <tbody>
          {humidifierEssences.map((essence, index) => (
            <tr 
              key={essence.id} 
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
              <td style={tdFirstStyle}>{essence.name}</td>
              <td style={tdStyle}>{essence.description || '-'}</td>
              <td style={tdStyle}>{essence.supplier_name || '-'}</td>
              <td style={tdNumberStyle}>${essence.cost_per_bottle}</td>
              <td style={tdNumberStyle}>{essence.bottle_volume_ml ? `${essence.bottle_volume_ml}ml` : '-'}</td>
              <td style={tdNumberStyle}>{essence.stock_units} un.</td>
              <td style={tdNumberStyle}>{essence.min_stock_units} un.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HumidifierEssenceList; 