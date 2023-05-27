import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import "./this.css"
function Loading(props) {
    return(
        <div className="loading">
            <FontAwesomeIcon icon={faGear} className="loadicon" />
            <div>
                { props.message }
            </div>
        </div>
    );
}

export default Loading;