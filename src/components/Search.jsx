import React, { useContext, useState } from 'react';
import PositionContext from '../context/PositionContext';

function Search() {
  const [text, setText] = useState('');
  const { lat, lon, city, getPosition, setCity, getCoords } =
    useContext(PositionContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(text);
    getCoords(text);
  };

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 mt-8 gap-8">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="relative">
                <input
                  onChange={handleChange}
                  placeholder={city ? city : 'Enter City Name'}
                  type="text"
                  className="w-full pr-40 bg-gray-200 input rounded-md input-lg text-black"
                />
                <div className="absolute top-0 right-0">
                  <button
                    type="button"
                    className="rounded-l-none rounded-r-md w-36 btn btn-lg"
                    onClick={getPosition}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
