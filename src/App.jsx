import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [cityData, setCityData] = useState({
    temp: "",
    humidity: "",
    condition: "",
    windSpeed: ""
  })
  const fetchCityData = async (city) => {
    const API_KEY = "47a0640b15414677bab100536242303"
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    try {
      const res = await axios.get(url);
      console.log("res: ", res.data);
      setCityData({
        temp: res?.data.current.temp_c,
        humidity: res?.data.current.humidity,
        condition: res?.data.current.condition.text,
        windSpeed: res?.data.current.wind_kph
      })

    } catch (error) {
      if (error.response.status === 400) {
        alert("Failed to fetch weather data");
      }
      console.log(error);
    }

  }
  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data);
    fetchCityData(payload.cityName);
  }
  return <div>
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
      <input required name="cityName" type="text" placeholder='Enter city name' style={{ height: '2rem', paddingLeft: '1rem', minWidth: '20rem' }} />
      <button type='submit'>Search</button>
    </form>
  </div>
}

export default App
