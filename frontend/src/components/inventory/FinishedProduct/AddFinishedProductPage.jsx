import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddFinishedProductForm from './AddFinishedProductForm';

// Removed fragrances, bottles, alcohols from props as they are not used by the new AddFinishedProductForm
function AddFinishedProductPage({ onFinishedProductAdded }) {
  const navigate = useNavigate();

  const handleFormSubmitSuccess = () => {
    if (onFinishedProductAdded) {
      onFinishedProductAdded();
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
      <h1>Añadir Nuevo Producto Terminado</h1>
      <AddFinishedProductForm 
        onFinishedProductAdded={handleFormSubmitSuccess} 
        // fragrances, bottles, alcohols props removed
      />
    </div>
  );
}

export default AddFinishedProductPage; 