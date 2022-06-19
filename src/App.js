import { useState, createContext } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const UserContext = createContext();

  const handleGetPos = () => {
    navigator.geolocation.getCurrentPosition(getPosition);
    function getPosition(pos) {
      setLat(pos.coords.latitude);
      setLon(pos.coords.longitude);
    }
  };

  const handleGetCity = (lat, lon) => {
    geoCode(lat, lon);
  };

  const geoCode = () => {
    fetch(
      `http://api.positionstack.com/v1/reverse?access_key=${process.env.REACT_APP_GEOCODE_API}&query=${lat},${lon}`
    )
      .then((response) => response.json())
      .then((data) => setCity(data.data[0].county));
  };

  return (
    <UserContext.Provider value={(lat, lon)}>
      <div>
        <button className="btn btn-ghost" onClick={handleGetPos}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        {lat && <p>latitude: {lat}</p>}
        {lon && <p>longitude: {lon}</p>}
      </div>
      <div className="">
        <button onClick={handleGetCity}>GET CITY</button>
        <p>city: {city}</p>
      </div>
    </UserContext.Provider>
  );
}

export default App;
