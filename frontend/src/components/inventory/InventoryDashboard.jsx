import React from 'react';
import FragranceList from './FragranceList';

function InventoryDashboard() {
  return (
    <div>
      <h1>Panel de Inventario</h1>
      <p>Aquí se mostrarán y gestionarán los elementos del inventario.</p>
      
      <FragranceList />

      {/* Próximamente: Tablas y formularios para Botellas, etc. */}
    </div>
  );
}

export default InventoryDashboard; 