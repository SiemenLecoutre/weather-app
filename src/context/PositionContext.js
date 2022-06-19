import { createContext, useState } from 'react';

const PositionContext = createContext();

export const PositionProvider = ({ children }) => {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [weatherData, setWeatherData] = useState();

  // Get Weather data
  const getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
  };

  //  Get coords & city name from location
  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(succes, error);
    function succes(pos) {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      setLat(lat);
      setLon(lon);
      getWeather(lat, lon);
      fetch(
        `http://api.positionstack.com/v1/reverse?access_key=${process.env.REACT_APP_GEOCODE_API}&query=${lat},${lon}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data.data[0].locality);
        });
    }
    function error(err) {
      alert('Could not find your location');
      console.log(err);
    }
  };

  //  Get coords from city name
  const getCoords = (city) => {
    fetch(
      `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_GEOCODE_API}&query=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLat(data.data[0].latitude);
        setLon(data.data[0].longitude);
        getWeather(data.data[0].latitude, data.data[0].longitude);
        setCity(data.data[0].locality);
      });
  };

  return (
    <PositionContext.Provider
      value={{
        lat,
        lon,
        city,
        weatherData,
        setCity,
        getPosition,
        getCoords,
        getWeather,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};

export default PositionContext;
