import "./SearchBar.css";
import { useState } from "react";
import { getCurrentWeather, getGeocoding } from "../core/service";

const RESPONSE_CITY_COUNT = 5;

function SearchBar(props) {
    const [query, setQuery] = useState("");
    const [cities, setCities] = useState([]);
    const [focused, setFocused] = useState(false);

    const search = (cityInfo) => {
        getCurrentWeather(cityInfo.lat, cityInfo.lon)
        .then(weatherInfo => weatherInfo.json())
        .then(jsonWeatherInfo => {
            props.searchCallback(jsonWeatherInfo);
            setQuery("");
            setCities([]);
        });
    }

    const onListClick = (city) => {
        search(city);
    }

    const onEnterPress = (evt) => {
        if (evt.key === "Enter") {
            search(cities[0]);
        }
    }

    const onSearchChange = (evt) => {
        setQuery(evt.target.value);
        const query = evt.target.value;
        if (query) {
            getGeocoding(query, RESPONSE_CITY_COUNT)
            .then(cityInfo => cityInfo.json())
            .then(jsonCityInfo => {
                setCities(jsonCityInfo); 
            });
        } else {
            setCities([]);
        }
    }

    const onInputFocus = (evt) => {
        if (evt.type === "focus") {
            setFocused(true);
        } else if (evt.type === "blur" && cities.length < 1) {
            setFocused(false);
        }
    }

    return (
        <div className={focused ? "search-box search-box-focused" : "search-box"}>
            <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={onSearchChange}
                value={query}
                onKeyDown={onEnterPress}
                onFocus={onInputFocus}
                onBlur={onInputFocus}
            />
            
            {((cities.length > 0) ? 
            (
                <div>
                    <hr />
                    <ul className="option-list">
                        {cities.map((city) => 
                            <li
                                key={city.lon + " " + city.lat}
                                className="option-list-item"
                                onClick={onListClick.bind(this, city)}
                            >
                                {city.name}, {city.country}
                            </li>)}
                    </ul>
                </div>
            ) : 
            (""))}
            
        </div>
    );
}

export default SearchBar;