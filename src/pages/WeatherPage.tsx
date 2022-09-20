import React, { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout';
import { getForecast } from '../utils/getForecast';

function WeatherPage() {
  const [forecast, setForecast] = useState([]);
  useEffect(() => {
    getForecast('dhaka', 'metric', function (data: any) {
      setForecast(data);
      console.log('data', data)
    });
  }, [])

  console.log('forecast', forecast)
  return (
    <AppLayout>
      <h1>Weather</h1>
    </AppLayout>
  )
}

export default WeatherPage