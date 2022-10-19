import "./WeatherBox.css";

function WeatherBox(props) {


    return (
        <div className="weather-box">
            <div className="temp">
                {Math.round(props.temp)}°c
            </div>
            <div className="weather">{props.weatherMain}</div>
        </div>
    );
}

export default WeatherBox;