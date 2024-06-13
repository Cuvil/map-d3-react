import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crea el contexto
const DataContext = createContext();

// Crea el proveedor
const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://etechgroup-001-site2.dtempurl.com/estacion/listardatos'); // Cambia la URL a la de tu API
        setData(response.data.Estacion); // Actualiza el estado solo con la propiedad 'Estacion' de la respuesta
      } catch (err) {
        setError(err); // Captura y establece el error en caso de falla
      } finally {
        setLoading(false); // Finaliza el estado de carga, independientemente del resultado
      }
    };

    fetchData(); // Llama a la función fetchData al montar el componente

    // Limpieza de efecto: no es necesario en este caso porque no hay suscripciones o temporizadores
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
