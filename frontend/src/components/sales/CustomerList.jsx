import React from 'react';

// Componente presentacional para mostrar la lista de clientes con tabla elegante y sofisticada
function CustomerList({ customers, isLoading, error, onRetry, onEdit, onDelete }) {
  if (isLoading) {
    return <div className="p-4 text-center rounded-lg w-full" style={{ backgroundColor: '#2A2A2A', color: '#B8B8B8' }}>Cargando clientes...</div>;
  }

  if (error) {
    return (
      <div className="p-4 border rounded-md w-full" style={{ backgroundColor: '#3A1A1A', borderColor: '#5A2A2A', color: '#FF9999' }}>
        <p className="font-semibold">Error al cargar clientes:</p>
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

  if (customers.length === 0) {
    return <div className="p-4 text-center rounded-lg w-full" style={{ backgroundColor: '#2A2A2A', color: '#B8B8B8' }}>No hay clientes registrados.</div>;
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

  const actionButtonStyle = {
    padding: '6px 12px',
    marginRight: '8px',
    fontSize: '12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#D4AF37',
    color: '#1A1A1A'
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#CC4444',
    color: '#FFFFFF'
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
            <th style={thStyle}>WhatsApp</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Notas</th>
            <th style={thStyle}>Fecha Registro</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr 
              key={customer.id} 
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
              <td style={tdFirstStyle}>{customer.name}</td>
              <td style={tdStyle}>{customer.whatsapp || '-'}</td>
              <td style={tdStyle}>{customer.email || '-'}</td>
              <td style={tdStyle}>{customer.notes || '-'}</td>
              <td style={tdStyle}>
                {customer.created_at ? new Date(customer.created_at).toLocaleDateString() : '-'}
              </td>
              <td style={tdStyle}>
                {onEdit && (
                  <button 
                    style={editButtonStyle}
                    onClick={() => onEdit(customer)}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#C4A037'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#D4AF37'}
                  >
                    Editar
                  </button>
                )}
                {onDelete && (
                  <button 
                    style={deleteButtonStyle}
                    onClick={() => onDelete(customer)}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#AA3333'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#CC4444'}
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList; 