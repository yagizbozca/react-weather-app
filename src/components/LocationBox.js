import "./LocationBox.css";
import { dateBuilder } from "../core/utils";

function LocationBox(props) {

    const getDate = (d) => {
        return dateBuilder(d);
    }

    return (
        <div className="location-box">
            <div className="location">{props.city}, {props.country}</div>
            <div className="date">{getDate(new Date())}</div>
        </div>
    );
}

export default LocationBox;