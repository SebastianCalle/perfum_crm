import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Bienvenido a Perfum CRM</h1>
      <p>Sistema de gestión para tu perfumería.</p>
      <nav>
        <ul>
          <li>
            <Link to="/inventory">Ir al Inventario</Link>
          </li>
          {/* Otros enlaces principales podrían ir aquí */}
        </ul>
      </nav>
    </div>
  );
}

export default HomePage; 