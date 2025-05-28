import React, { useState, useEffect } from 'react';

function FragranceList() {
  const [fragrances, setFragrances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFragrances = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/inventory/fragrances/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFragrances(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setFragrances([]); // Clear fragrances on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchFragrances();
  }, []); // El array vacío asegura que se ejecute solo al montar

  if (isLoading) {
    return <p>Cargando fragancias...</p>;
  }

  if (error) {
    return <p>Error al cargar fragancias: {error}</p>;
  }

  return (
    <div>
      <h2>Lista de Fragancias</h2>
      {fragrances.length === 0 ? (
        <p>No hay fragancias registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre Interno</th>
              <th>Nombre Inspiración</th>
              <th>Casa</th>
              <th>Costo (g)</th>
              <th>Stock (g)</th>
              <th>Stock Mín. (g)</th>
            </tr>
          </thead>
          <tbody>
            {fragrances.map((fragrance) => (
              <tr key={fragrance.id /* Asumiendo que hay un id */}>
                <td>{fragrance.internal_name}</td>
                <td>{fragrance.inspiration_name}</td>
                <td>{fragrance.house}</td>
                <td>{fragrance.cost_per_g}</td>
                <td>{fragrance.stock_g}</td>
                <td>{fragrance.min_stock_g}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FragranceList; 