import "./SearchBar.css";
import { useState } from "react";
import { getCurrentWeather, getGeocoding } from "../core/service";

function SearchBar(props) {
    const [query, setQuery] = useState("");

    const search = (evt) => {
        if (evt.key === "Enter") {
            getGeocoding(query)
                .then(cityInfo => cityInfo.json())
                .then(jsonCityInfo => getCurrentWeather(jsonCityInfo[0].lat, jsonCityInfo[0].lon))
                .then(weatherInfo => weatherInfo.json())
                .then(jsonWeatherInfo => {
                    props.searchCallback(jsonWeatherInfo);
                    setQuery("");
                });
        }
    }

    return (
        <div className="search-box">
            <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyDown={search}
            />
        </div>
    );
}

export default SearchBar;