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
        `https://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_GEOCODE_API}&location=${lat},${lon}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data.results[0].locations[0].adminArea5);
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
      `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_GEOCODE_API}&location=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const lat = data.results[0].locations[0].latLng.lat;
        const lon = data.results[0].locations[0].latLng.lng;
        setLat(lat);
        setLon(lon);
        getWeather(lat, lon);
        setCity(data.results[0].locations[0].adminArea5);
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
