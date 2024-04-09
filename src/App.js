import Input from './components/Input';
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [degrees, setDegrees] = useState(null);
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [country, setCountry] = useState(null);
  const [dataFetch, setDataFetch] = useState(false); 

  const fetchData = async (e) => {
    e.preventDefault("");

    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      const data = await res.data;

      setDegrees(data.main.temp);
      setLocation(data.name);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCountry(data.sys.country);

    setDataFetch(true);
    }catch(error){
      console.log(error);
      alert("Kindly type the correct location or check your internet connection")
    }
  }

  const defaultDataFetch =async () => {

    if(!dataFetch){
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=tarkwa&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      const data = await res.data;
  
      setDegrees(data.main.temp);
      setLocation(data.name);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCountry(data.sys.country); 
    }
  }

  useEffect(() => {
    defaultDataFetch();
  }, []);
  return (
    <div className="App">
      <div className='weather'>
          <Input 
            text={(e) => setUserLocation(e.target.value)}
            submit={fetchData}
            func={fetchData}
          />
        <div className='weather-display' >
          <h3 className='weather-location'>Weather in {location}</h3>

          <div className='weather-degrees'>
            <h1>{degrees} °C</h1>
          </div>
        </div>
        <div className='weather-description'>

            <div>
              <div className='weather-description-head'>
                <span className='weather-icon'>
                  <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
                </span>
                <h3 className='desc'>{description}</h3>
              </div>
                <h3>Humidity: {humidity}%</h3>
                <h3>Wind speed: {wind} m/s</h3>
            </div>

            <div className='weather-country'>
              <h3>{country}</h3>
              <h3 className='weather-date'>4/08/2024, 2:05:24 PM</h3>
            </div>

          </div>
      </div>
    </div>
  );
}

export default App;
