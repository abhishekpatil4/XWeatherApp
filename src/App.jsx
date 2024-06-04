import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    } catch (error) {
      if (error.response.status === 400) {
        alert("Failed to fetch weather data");
      }
      console.log(error);
      setLoading(false);
    }

  }
  const handleSearch = (event) => {
    setLoading(true);
    event.preventDefault();
    setCityData({
      temp: "",
      humidity: "",
      condition: "",
      windSpeed: ""
    })
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data);
    fetchCityData(payload.cityName);
  }
  return <div>
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem 0rem' }}>
      <input required name="cityName" type="text" placeholder='Enter city name' style={{ height: '2rem', paddingLeft: '1rem', minWidth: '20rem' }} />
      <button type='submit'>Search</button>
    </form>
    {loading ?
      <p>Loading data…</p>
      :
      cityData.condition !== ""
      &&
      <div className='weather-cards' style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: "center", gap: 20, flexWrap: 'wrap' }}>
        <div className='weather-card' style={{ backgroundColor: '#3B3B3B', height: '8rem', width: '15rem', padding: '0.5rem', borderRadius: '8px', boxShadow: '0px 5px 10px #292929' }}>
          <div style={{ margin: '22% 0%' }}>
            Temperature: {cityData.temp}°C
          </div>
        </div>
        <div className='weather-card' style={{ backgroundColor: '#3B3B3B', height: '8rem', width: '15rem', padding: '0.5rem', borderRadius: '8px', boxShadow: '0px 5px 10px #292929' }}>
          <div style={{ margin: '22% 0%' }}>
            Humidity: {cityData.humidity}%
          </div>
        </div>
        <div className='weather-card' style={{ backgroundColor: '#3B3B3B', height: '8rem', width: '15rem', padding: '0.5rem', borderRadius: '8px', boxShadow: '0px 5px 10px #292929' }}>
          <div style={{ margin: '22% 0%' }}>
            Condition: {cityData.condition}
          </div>
        </div>
        <div className='weather-card' style={{ backgroundColor: '#3B3B3B', height: '8rem', width: '15rem', padding: '0.5rem', borderRadius: '8px', boxShadow: '0px 5px 10px #292929' }}>
          <div style={{ margin: '22% 0%' }}>
            Wind Speed: {cityData.windSpeed} kph
          </div>
        </div>
      </div>
    }
  </div>
}

export default App
