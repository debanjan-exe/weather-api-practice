import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null)
  const [input, setInput] = useState("")
  useEffect(() => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Delhi&aqi=no`)
      .then(data => {
        setWeather(data.data);
      })
      .catch(err => console.log(err));
  }, [])

  // Event
  const weatherInput = (e) => {
    setInput(e.target.value);
  }

  const searchWeather = () => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=e4d324a6ff3445229f554012211509&q=${input}&aqi=no`)
      .then(data => {
        setWeather(data.data);
      })
      .catch(err => alert("Incorrect Input"));
  }

  return (
    <div>
      {weather && (
        <div className="app">
          <div>
            <input onChange={weatherInput} type="text" id="myInput" />
            <button onClick={searchWeather}>Search</button>
          </div>
          <h1>{weather.location.country}</h1>
          <h1>{weather.location.name}</h1>
          <h2>{weather.location.region}</h2>
          <div className="condition">
            <h3>{weather.current.condition.text}</h3>
            <img src={weather.current.condition.icon} alt="condition" />
            <h3>{weather.current.temp_c} ° Celsius</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
