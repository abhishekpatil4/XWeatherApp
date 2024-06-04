import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data);
    console.log("payload: ", payload);
  }
  return <div>
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
      <input required name="cityName" type="text" placeholder='Enter city name' style={{ height: '2rem', paddingLeft: '1rem', minWidth: '20rem' }} />
      <button type='submit'>Search</button>
    </form>
  </div>
}

export default App
