import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación
import FragranceList from './FragranceList';
import BottleList from './BottleList'; // Importar BottleList
import AlcoholList from './AlcoholList'; // Importar AlcoholList

// Estilos simples para los tabs (pueden mejorarse mucho con CSS dedicado)
const tabStyles = {
  tabsContainer: {
    display: 'flex',
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
  },
  tabButton: {
    padding: '10px 15px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    borderBottom: '2px solid transparent',
    marginRight: '5px',
  },
  activeTab: {
    borderBottom: '2px solid blue',
    fontWeight: 'bold',
  }
};

function InventoryDashboard({ 
  fragrances, isLoadingFragrances, errorFragrances, onRefreshFragrances,
  bottles, isLoadingBottles, errorBottles, onRefreshBottles,
  alcohols, isLoadingAlcohols, errorAlcohols, onRefreshAlcohols // Props para alcohol
}) {
  const [activeTab, setActiveTab] = useState('fragrances'); // 'fragrances', 'bottles', 'alcohols'

  return (
    <div>
      <h1>Panel de Inventario</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <Link to="/inventory/fragrances/add">
          <button>Añadir Fragancia</button>
        </Link>
        <Link to="/inventory/bottles/add">
          <button>Añadir Botella</button>
        </Link>
        <Link to="/inventory/alcohols/add"> {/* Enlace para añadir alcohol */}
          <button>Añadir Alcohol</button>
        </Link>
        {/* Aquí irán más botones para otros ítems */}
      </div>
      
      {/* Contenedor de Tabs */}
      <div style={tabStyles.tabsContainer}>
        <button 
          style={activeTab === 'fragrances' ? {...tabStyles.tabButton, ...tabStyles.activeTab} : tabStyles.tabButton}
          onClick={() => setActiveTab('fragrances')}
        >
          Fragancias
        </button>
        <button 
          style={activeTab === 'bottles' ? {...tabStyles.tabButton, ...tabStyles.activeTab} : tabStyles.tabButton}
          onClick={() => setActiveTab('bottles')}
        >
          Botellas
        </button>
        <button 
          style={activeTab === 'alcohols' ? {...tabStyles.tabButton, ...tabStyles.activeTab} : tabStyles.tabButton}
          onClick={() => setActiveTab('alcohols')}
        >
          Alcoholes
        </button>
        {/* Próximamente: Tabs para Aditivos, etc. */}
      </div>

      {/* Contenido de los Tabs */}
      {activeTab === 'fragrances' && (
        <FragranceList 
          fragrances={fragrances} 
          isLoading={isLoadingFragrances} 
          error={errorFragrances} 
          onRetry={onRefreshFragrances}
        />
      )}
      {activeTab === 'bottles' && (
        <BottleList 
          bottles={bottles} 
          isLoading={isLoadingBottles} 
          error={errorBottles} 
          onRetry={onRefreshBottles}
        />
      )}
      {activeTab === 'alcohols' && (
        <AlcoholList 
          alcohols={alcohols} 
          isLoading={isLoadingAlcohols} 
          error={errorAlcohols} 
          onRetry={onRefreshAlcohols}
        />
      )}
      {/* Próximamente: Contenido para otros tabs */}
    </div>
  );
}

export default InventoryDashboard; 