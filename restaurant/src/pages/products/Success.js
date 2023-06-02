import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClose } from "@fortawesome/free-solid-svg-icons";
function Success(props) {
    return(
        <div className='update-modal'>
          <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)" }}>
            <div style={{ fontSize: "75px", color: "green" }}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            {props.message}
          </div>
          <span style={{ cursor: "pointer" }} onClick={(e) => {
            props.setSuccess(false)
            props.setSuccessClass("")
          }}>
            <FontAwesomeIcon icon={faClose} />
          </span>
        </div>
    );
}

export default Success;