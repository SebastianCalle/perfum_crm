import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddHumidifierEssenceForm from './AddHumidifierEssenceForm';

function AddHumidifierEssencePage({ onHumidifierEssenceAdded }) {
  const navigate = useNavigate();

  const handleFormSubmitSuccess = () => {
    if (onHumidifierEssenceAdded) {
      onHumidifierEssenceAdded();
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
      <h1>Añadir Nueva Esencia para Humidificador</h1>
      <AddHumidifierEssenceForm onHumidifierEssenceAdded={handleFormSubmitSuccess} />
    </div>
  );
}

export default AddHumidifierEssencePage; 