import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const LeftNavigate = (props) => {
    return (
        <>
            <Link to={props.url}>
                <div className="left-navigate">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <> Back</>
                </div>
            </Link>
        </>
    );
}

export default LeftNavigate;