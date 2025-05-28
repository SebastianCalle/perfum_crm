import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#1A1A1A', color: '#F5F5DC' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: '#D4AF37' }}>
          Bienvenido a Gallery Essence CRM
        </h1>
        <p className="text-xl text-center mb-8" style={{ color: '#F5F5DC' }}>
          Sistema de gestión elegante para tu perfumería de lujo.
        </p>
        <div className="flex justify-center">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#2A2A2A', border: '1px solid #3A3A3A' }}>
            <nav>
              <ul className="space-y-4">
                <li className="text-center">
                  <Link 
                    to="/inventory"
                    className="inline-block px-6 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-opacity-80"
                    style={{ 
                      backgroundColor: '#D4AF37',
                      color: '#1A1A1A',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#C4A037'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#D4AF37'}
                  >
                    Gestionar Inventario
                  </Link>
                </li>
                {/* Otros enlaces principales podrían ir aquí */}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 