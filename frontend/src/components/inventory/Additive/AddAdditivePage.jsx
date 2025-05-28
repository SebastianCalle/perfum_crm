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
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Header */}
        <div className="mb-8">
          <Link 
            to="/inventory"
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-900 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al Inventario
          </Link>
          
          {/* Breadcrumb */}
          <nav className="mt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-primary-600">
              <li>
                <Link to="/inventory" className="hover:text-primary-900 transition-colors">
                  Inventario
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-primary-900 font-medium">Añadir Aditivo</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Nuevo Aditivo
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Registre un nuevo aditivo o potenciador en el sistema de inventario completando todos los campos requeridos.
          </p>
        </div>

        {/* Form Component */}
        <AddAdditiveForm onAdditiveAdded={handleFormSubmitSuccess} />
      </div>
    </div>
  );
}

export default AddAdditivePage; 