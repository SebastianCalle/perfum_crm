import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddBottleForm from './AddBottleForm';

function AddBottlePage({ onBottleAdded }) {
  const navigate = useNavigate();

  const handleFormSubmitSuccess = () => {
    if (onBottleAdded) {
      onBottleAdded();
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
      <h1>Añadir Nueva Botella</h1>
      <AddBottleForm onBottleAdded={handleFormSubmitSuccess} />
    </div>
  );
}

export default AddBottlePage; 