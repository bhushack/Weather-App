import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";

const Temp = () => {

    const [searchValue , setSearchValue] = useState("Goa");
    const [tempInfo , setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=2ead8eec743da2bcd20eafcef4abda4d`;

            const res = await fetch(url);
            const data = await res.json();

           const {temp, pressure, humidity} = data.main;
           const { main: weathermood } = data.weather[0];
           const {name} = data;
           const {speed} = data.wind;
           const {country, sunset} = data.sys;

           const myNewWeatherInfo = {
             temp,
             pressure,
             humidity,
             weathermood,
             name,
             speed,
             country,
             sunset,
           };

           setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error);
        }

    };

       useEffect(() => {
         getWeatherInfo();
       }, []);
    
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search.."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="searchButton" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;