import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-purple-200 transition-colors">
            Perfum CRM
          </Link>
          <div>
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-purple-500 rounded-md transition-colors mr-2"
            >
              Inicio
            </Link>
            <Link 
              to="/inventory" 
              className="px-4 py-2 hover:bg-purple-500 rounded-md transition-colors"
            >
              Inventario
            </Link>
            {/* Más enlaces de navegación pueden ir aquí */}
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        <Outlet /> {/* Aquí se renderizarán las rutas anidadas */}
      </main>

      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Perfum CRM. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Layout; 