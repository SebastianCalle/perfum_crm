import React from 'react';

// Componente presentacional para mostrar la lista de alcoholes con tabla elegante y sofisticada
function AlcoholList({ alcohols, isLoading, error, onRetry }) {
  if (isLoading) {
    return <div className="p-4 text-center rounded-lg w-full" style={{ backgroundColor: '#2A2A2A', color: '#B8B8B8' }}>Cargando tipos de alcohol...</div>;
  }

  if (error) {
    return (
      <div className="p-4 border rounded-md w-full" style={{ backgroundColor: '#3A1A1A', borderColor: '#5A2A2A', color: '#FF9999' }}>
        <p className="font-semibold">Error al cargar alcoholes:</p>
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

  if (alcohols.length === 0) {
    return <div className="p-4 text-center rounded-lg w-full" style={{ backgroundColor: '#2A2A2A', color: '#B8B8B8' }}>No hay tipos de alcohol registrados.</div>;
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

  const tdDateStyle = {
    ...tdStyle,
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
            <th style={thStyle}>Nombre (Tipo)</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Proveedor</th>
            <th style={thStyle}>Fecha Compra</th>
            <th style={thStyle}>Costo Unit.</th>
            <th style={thStyle}>Vol. Unit. (ml)</th>
            <th style={thStyle}>Costo/ml</th>
            <th style={thStyle}>Notas Stock</th>
          </tr>
        </thead>
        <tbody>
          {alcohols.map((alcohol, index) => (
            <tr 
              key={alcohol.id} 
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
              <td style={tdFirstStyle}>{alcohol.name}</td>
              <td style={tdStyle}>{alcohol.description || '-'}</td>
              <td style={tdStyle}>{alcohol.supplier_name || '-'}</td>
              <td style={tdDateStyle}>
                {alcohol.purchase_date ? new Date(alcohol.purchase_date).toLocaleDateString() : 'N/A'}
              </td>
              <td style={tdNumberStyle}>${alcohol.purchase_unit_cost}</td>
              <td style={tdNumberStyle}>{alcohol.purchase_unit_volume_ml}ml</td>
              <td style={tdNumberStyle}>${alcohol.cost_per_ml}</td>
              <td style={tdStyle}>{alcohol.stock_notes || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlcoholList; 