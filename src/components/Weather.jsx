import React, { useContext, useEffect } from 'react';
import PositionContext from '../context/PositionContext';
import { TbWind, TbWindsock } from 'react-icons/tb';
import { FiCompass } from 'react-icons/fi';
import { BsThermometerHalf, BsUmbrella, BsEye } from 'react-icons/bs';

function Weather() {
  const { weatherData, city, getPosition } = useContext(PositionContext);

  useEffect(() => {
    getPosition();
  }, []);

  return weatherData && city ? (
    <div className="flex justify-center">
      <div className="card w-full sm:w-3/4 bg-base-100 shadow-xl  p-2">
        <figure className="px-10 pt-10">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt="Weather"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-5xl">{city}</h2>
        </div>
        <div className="overflow-x-auto mt-5">
          {/* Wind Table */}
          <table className="table w-full text-center">
            <thead>
              <tr>
                <th className="">Wind</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/3 ">
                  <TbWind className="w-6 h-6 inline-flex items-center" />
                </td>
                <td className="w-1/3 ">Wind Speed</td>
                <td className="w-1/3">{weatherData.wind.speed} m/s</td>
              </tr>
              <tr>
                <td>
                  <TbWindsock className="w-6 h-6 inline-flex items-center" />
                </td>
                <td>Gust Speed</td>
                <td>{weatherData.wind.gust} m/s</td>
              </tr>
              <tr>
                <td>
                  <FiCompass className="w-6 h-6 inline-flex items-center" />
                </td>
                <td>Wind Direction</td>
                <td>{weatherData.wind.deg} °</td>
              </tr>
            </tbody>
          </table>
          {/*  */}
          <table className="table w-full text-center mt-5">
            <thead>
              <tr>
                <th>Conditions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/3">
                  <BsThermometerHalf className="w-6 h-6 inline-flex items-center" />
                </td>
                <td className="w-1/3">Temperature</td>
                <td className="w-1/3">{weatherData.main.temp} °C</td>
              </tr>
              <tr>
                <td>
                  <BsUmbrella className="w-6 h-6 inline-flex items-center" />
                </td>
                <td>Humidity</td>
                <td>{weatherData.main.humidity}%</td>
              </tr>
            </tbody>
          </table>
          {/*  */}
          <table className="table w-full text-center mt-5">
            <thead>
              <tr>
                <th>Visibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/3">
                  <BsEye className="w-6 h-6 inline-flex items-center" />
                </td>
                <td className="w-1/3">Visibility</td>
                <td className="w-1/3">{weatherData.visibility} m</td>
              </tr>
              <tr>
                <td>
                  <BsUmbrella className="w-6 h-6 inline-flex items-center" />
                </td>
                <td>Cloud Coverage</td>
                <td>{weatherData.clouds.all}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex h-screen justify-center items-center">
      <progress className="progress w-56"></progress>
    </div>
  );
}

export default Weather;
