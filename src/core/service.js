const api = {
    key: "d101335a32d02cf22c2dd8a39c8ed373",
    base: "https://api.openweathermap.org/",
    currentWeather: "data/2.5/weather",
    geolocation: "geo/1.0/direct"
}

export const getGeocoding = (cityName, cityCount = 1) => {
    return fetch(`${api.base}${api.geolocation}?q=${cityName}&limit=${cityCount}&appid=${api.key}`);
}

export const getCurrentWeather = (lat, lon) => {
    return fetch(`${api.base}${api.currentWeather}?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`);
}