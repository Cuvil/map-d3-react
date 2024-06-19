import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartTemperaturePrecipitation = ({ weatherData }) => {
  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Temperatura y Precipitación'
    },
    xAxis: {
      categories: weatherData.map(data => data.date)
    },
    yAxis: [
      {
        title: {
          text: 'Temperatura (°C)'
        }
      },
      {
        title: {
          text: 'Precipitación (mm)'
        },
        opposite: true
      }
    ],
    series: [
      {
        name: 'Temperatura Máxima',
        data: weatherData.map(data => data.tempMax)
      },
      {
        name: 'Temperatura Mínima',
        data: weatherData.map(data => data.tempMin)
      },
      {
        name: 'Precipitación',
        type: 'column',
        data: weatherData.map(data => data.precipitation),
        yAxis: 1
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartTemperaturePrecipitation;
