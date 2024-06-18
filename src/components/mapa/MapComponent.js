// src/components/mapa/MapComponent.js
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import ChartEstConvencionales from '../graficos/ChartEstConvencionales';
import ModalEstConvencionales from '../modal/ModalEstConvencionales';

const MapComponent = ({ mostrarMarcadores, estaciones }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const container = L.DomUtil.get('map-container');
    if (container._leaflet_id != null) {
      container._leaflet_id = null;
    }

    const initialCoordinates = [-5.149, -74.136];
    const initialZoomLevel = 7.4;

    const map = L.map('map-container').setView(initialCoordinates, initialZoomLevel);

    const satelliteMapLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    const streetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const cloudsLayer = L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=fc3460a17b9746792bd0408d435de0bd', {
      attribution: 'Map data &copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
    });

    map.zoomControl.setPosition('topright');

    const baseMaps = {
      "Mapa Satelital": satelliteMapLayer,
      "Mapa de Calles": streetMapLayer,
    };
    const overlayMaps = {
      "Nubes en Tiempo Real": cloudsLayer
    };
    L.control.layers(baseMaps, overlayMaps).addTo(map);

    const limpiarMarcadores = () => {
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
    };

    const crearMarcadores = () => {
      limpiarMarcadores();

      if (mostrarMarcadores && estaciones) {
        estaciones.forEach(estacion => {
          const marker = L.marker([estacion.EstLatitud, estacion.EstLongitud], {
            icon: L.icon({
              iconUrl: `img/Marker/${estacion.EstColor.toLowerCase()}.png`,
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
            setWeatherData(estacion.weatherData); // Asegúrate de que cada estación tenga weatherData
            setModalIsOpen(true);
          });
        });
      }
    };

    crearMarcadores();
  }, [mostrarMarcadores, estaciones]);

  return (
    <div>
      <div id="map-container" style={{ width: '97%', height: '110vh' }}></div>
      <ModalEstConvencionales isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <ChartEstConvencionales weatherData={weatherData} />
      </ModalEstConvencionales>
    </div>
  );
};

export default MapComponent;
