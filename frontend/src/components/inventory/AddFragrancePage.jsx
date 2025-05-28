import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddFragranceForm from './AddFragranceForm';

function AddFragrancePage({ onFragranceAdded }) {
  const navigate = useNavigate();

  const handleFormSubmitSuccess = () => {
    if (onFragranceAdded) {
      onFragranceAdded(); // Llama al callback para refrescar los datos en el dashboard
    }
    navigate('/inventory'); // Navega de vuelta al dashboard de inventario
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/inventory">
          <button>&larr; Volver al Inventario</button>
        </Link>
      </div>
      <h1>Añadir Nueva Fragancia</h1>
      <AddFragranceForm onFragranceAdded={handleFormSubmitSuccess} />
    </div>
  );
}

export default AddFragrancePage; 