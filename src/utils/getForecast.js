
export async function getForecast(q, unit="metric", forecastSetter) {
  try {
    const apiKey = "1fe964584977428d6c6d40d53031b207"
    // const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=" + apiKey;
    const forcastUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+q+"&units="+unit+"&appid=" + apiKey;
    const response = await fetch(forcastUrl);
    
    if (response.status === 404) return forecastSetter({ error: 'Sorry, we couldn\'t find that city.' })

    const data = await response.json();
    console.log('process.env.OPENWEATHER_API_KEY', process.env.OPENWEATHER_API_KEY)
    console.log('data', data)
    const newForecast = { 
      city: data.name,
      desc: data.weather[0].description,
      temp: parseInt(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    };
    forecastSetter(newForecast);
  } catch (error) {
    console.error(error);
  };
};