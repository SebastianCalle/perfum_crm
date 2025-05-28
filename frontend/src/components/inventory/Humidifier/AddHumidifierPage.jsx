import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddHumidifierForm from './AddHumidifierForm';

function AddHumidifierPage({ onHumidifierAdded }) {
  const navigate = useNavigate();

  const handleFormSubmitSuccess = () => {
    if (onHumidifierAdded) {
      onHumidifierAdded();
    }
    navigate('/inventory');
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/inventory">
          <button>&larr; Volver al Inventario</button>
        </Link>
      </div>
      <h1>Añadir Nuevo Humidificador</h1>
      <AddHumidifierForm onHumidifierAdded={handleFormSubmitSuccess} />
    </div>
  );
}

export default AddHumidifierPage; 