import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-dark flex flex-col" style={{ backgroundColor: '#1A1A1A' }}>
      <header className="bg-gradient-to-r from-primary-100 to-primary-200 shadow-lg" style={{ background: 'linear-gradient(to right, #2A2A2A, #3A3A3A)' }}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-600 transition-colors" style={{ color: '#D4AF37' }}>
            Gallery Essence CRM
          </Link>
          <div>
            <Link 
              to="/" 
              className="px-4 py-2 text-light hover:bg-primary-200 rounded-md transition-colors mr-2"
              style={{ color: '#F5F5DC' }}
            >
              Inicio
            </Link>
            <Link 
              to="/inventory" 
              className="px-4 py-2 text-light hover:bg-primary-200 rounded-md transition-colors"
              style={{ color: '#F5F5DC' }}
            >
              Inventario
            </Link>
            {/* Más enlaces de navegación pueden ir aquí */}
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8" style={{ backgroundColor: '#1A1A1A', minHeight: 'calc(100vh - 140px)' }}>
        <Outlet /> {/* Aquí se renderizarán las rutas anidadas */}
      </main>

      <footer className="py-6 text-center" style={{ backgroundColor: '#2A2A2A', color: '#F5F5DC' }}>
        <p>&copy; {new Date().getFullYear()} Gallery Essence CRM. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Layout; 