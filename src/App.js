// No need to import React from "react"; anymore

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import LocationBox from "./components/LocationBox";
import WeatherBox from "./components/WeatherBox";

const App = () => {
// or
// function App() {
    const [weather, setWeather] = useState({});

    const searchCallback = (jsonWeatherInfo) => {
        setWeather(jsonWeatherInfo);
    }

    return (
        <div className="main-body">
            <div className={
                (typeof weather.main != "undefined")
                    ? (weather.main.temp > 16)
                        ? "app warm" : "app"
                    : "app"}>
                <main>
                    <SearchBar searchCallback={searchCallback} />
                    {(typeof weather.main != "undefined") ? (
                        <div className="info-margin-top">
                            <LocationBox city={weather.name} country={weather.sys.country} />
                            <WeatherBox temp={weather.main.temp} weatherMain={weather.weather[0].main} />
                        </div>
                    ) : ("")}
                </main>
            </div>
        </div>
    );
}

export default App;
