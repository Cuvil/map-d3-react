// api.js

const API_URL = 'https://etechgroup-001-site2.dtempurl.com/estacionhm/ListarDatosMeteo'; // Reemplaza con la URL de tu API

export const fetchStationAndWeatherData = async () => {
  try {
    const response = await fetch(`${API_URL}/datos-estaciones-climaticos`);
    if (!response.ok) {
      throw new Error('Error fetching station and weather data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en fetchStationAndWeatherData:', error);
    throw error; // Propaga el error para que el componente lo maneje
  }
};
