import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import '../../context/DataContext';

const MapComponent = ({ mostrarMarcadores, estaciones }) => {
  useEffect(() => {
    // Verificar si el contenedor del mapa ya está inicializado
    const container = L.DomUtil.get('map-container');
    if (container._leaflet_id != null) {
      container._leaflet_id = null; // Resetear el contenedor del mapa
    }
  
    // Coordenadas y nivel de zoom iniciales
    const initialCoordinates = [-5.149, -74.136]; // Coordenadas [latitud, longitud]
    const initialZoomLevel = 7.4;

    // Crear el mapa usando Leaflet y establecer la vista inicial
    const map = L.map('map-container').setView(initialCoordinates, initialZoomLevel);

    // Agregar una capa de mapa base satelital
    const satelliteMapLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(map);

    // Agregar una capa de mapa de calles
    const streetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Agregar una capa de nubes en tiempo real
    const cloudsLayer = L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=fc3460a17b9746792bd0408d435de0bd', {
      attribution: 'Map data &copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
    });

    // Mover los controles de zoom a la parte superior derecha
    map.zoomControl.setPosition('topright');

    // Agregar un control de capas para cambiar entre el mapa satelital, el mapa de calles y la capa de nubes
    const baseMaps = {
      "Mapa Satelital": satelliteMapLayer,
      "Mapa de Calles": streetMapLayer,
    };
    const overlayMaps = {
      "Nubes en Tiempo Real": cloudsLayer
    };
    L.control.layers(baseMaps, overlayMaps).addTo(map);

    // Función para limpiar todos los marcadores del mapa
    const limpiarMarcadores = () => {
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
    };

    // Función para crear los marcadores en el mapa
    const crearMarcadores = () => {
      limpiarMarcadores(); // Limpiar marcadores existentes

      if (mostrarMarcadores && estaciones) {
        estaciones.forEach(estacion => {
          const marker = L.marker([estacion.EstLatitud, estacion.EstLongitud], {
            icon: L.icon({
              iconUrl: `img/Marker/${estacion.EstColor.toLowerCase()}.png`, // Ruta al icono de marcador basado en el color de la estación
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            }),
          }).addTo(map);

          marker.bindTooltip(estacion.EstNombre, {
            permanent: false,
            direction: 'top',
            opacity: 0.7,
          });

          marker.on('click', () => {
            // Acción al hacer clic en el marcador (puedes personalizar esta acción según tus necesidades)
            console.log(`Clic en marcador de ${estacion.EstNombre}`);
          });
        });
      }
    };

    // Llamar a la función para crear marcadores al inicio y cuando cambien las dependencias
    crearMarcadores();

  }, [mostrarMarcadores, estaciones]); // Ejecutar cada vez que mostrarMarcadores o estaciones cambia

  return (
    <div id="map-container" style={{ width: '97%', height: '110vh' }}>
      {/* Contenedor para el mapa */}
    </div>
  );
};

export default MapComponent;
