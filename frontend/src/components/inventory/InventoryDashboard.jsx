import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación
import FragranceList from './FragranceList';
import BottleList from './BottleList'; // Importar BottleList
import AlcoholList from './AlcoholList'; // Importar AlcoholList
import AdditiveList from './AdditiveList'; // Importar AdditiveList
import HumidifierList from './HumidifierList'; // Importar HumidifierList
import HumidifierEssenceList from './HumidifierEssenceList'; // Importar HumidifierEssenceList

// Estilos simples para los tabs (pueden mejorarse mucho con CSS dedicado)
const tabStyles = {
  tabsContainer: {
    display: 'flex',
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
    flexWrap: 'wrap',
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
  alcohols, isLoadingAlcohols, errorAlcohols, onRefreshAlcohols,
  additives, isLoadingAdditives, errorAdditives, onRefreshAdditives,
  humidifiers, isLoadingHumidifiers, errorHumidifiers, onRefreshHumidifiers,
  humidifierEssences, isLoadingHumidifierEssences, errorHumidifierEssences, onRefreshHumidifierEssences // Props para aditivos, humidificadores y esencias
}) {
  const [activeTab, setActiveTab] = useState('fragrances'); // 'fragrances', 'bottles', 'alcohols', 'additives', 'humidifiers', 'humidifierEssences'

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
        <Link to="/inventory/additives/add"> {/* Enlace para añadir aditivo */}
          <button>Añadir Aditivo</button>
        </Link>
        <Link to="/inventory/humidifiers/add"> {/* Enlace para añadir humidificador */}
          <button>Añadir Humidificador</button>
        </Link>
        <Link to="/inventory/humidifier-essences/add"> {/* Enlace para añadir esencia */}
          <button>Añadir Esencia Hum.</button>
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
        <button 
          style={activeTab === 'additives' ? {...tabStyles.tabButton, ...tabStyles.activeTab} : tabStyles.tabButton}
          onClick={() => setActiveTab('additives')}
        >
          Aditivos
        </button>
        <button 
          style={activeTab === 'humidifiers' ? {...tabStyles.tabButton, ...tabStyles.activeTab} : tabStyles.tabButton}
          onClick={() => setActiveTab('humidifiers')}
        >
          Humidificadores
        </button>
        <button 
          style={activeTab === 'humidifierEssences' ? {...tabStyles.tabButton, ...tabStyles.activeTab} : tabStyles.tabButton}
          onClick={() => setActiveTab('humidifierEssences')}
        >
          Esencias Hum.
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
      {activeTab === 'additives' && (
        <AdditiveList 
          additives={additives} 
          isLoading={isLoadingAdditives} 
          error={errorAdditives} 
          onRetry={onRefreshAdditives}
        />
      )}
      {activeTab === 'humidifiers' && (
        <HumidifierList 
          humidifiers={humidifiers} 
          isLoading={isLoadingHumidifiers} 
          error={errorHumidifiers} 
          onRetry={onRefreshHumidifiers}
        />
      )}
      {activeTab === 'humidifierEssences' && (
        <HumidifierEssenceList 
          humidifierEssences={humidifierEssences} 
          isLoading={isLoadingHumidifierEssences} 
          error={errorHumidifierEssences} 
          onRetry={onRefreshHumidifierEssences}
        />
      )}
      {/* Próximamente: Contenido para otros tabs */}
    </div>
  );
}

export default InventoryDashboard; 