import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddAdditiveForm from './AddAdditiveForm';

function AddAdditivePage({ onAdditiveAdded }) {
  const navigate = useNavigate();

  const handleFormSubmitSuccess = () => {
    if (onAdditiveAdded) {
      onAdditiveAdded();
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
      <h1>Añadir Nuevo Aditivo/Potenciador</h1>
      <AddAdditiveForm onAdditiveAdded={handleFormSubmitSuccess} />
    </div>
  );
}

export default AddAdditivePage; 