import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddAlcoholForm from './AddAlcoholForm';

function AddAlcoholPage({ onAlcoholAdded }) {
  const navigate = useNavigate();

  const handleFormSubmitSuccess = () => {
    if (onAlcoholAdded) {
      onAlcoholAdded();
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
      <h1>Añadir Nuevo Alcohol</h1>
      <AddAlcoholForm onAlcoholAdded={handleFormSubmitSuccess} />
    </div>
  );
}

export default AddAlcoholPage; 