import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import './this.css';
function Success(props) {
  const style = {
    width: "100%",
    height: "calc(100vh - 64px)",
    position: "absolute",
    zIndex: 10,
  };
  return (
    <div style={props.style ? props.style : style}>
      <div className='update-modal'>
        {props.message.icon == "faClose" ?
          <>
            <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)" }}>
              <div style={{ fontSize: "75px", color: "crimson" }}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </div>
              {props.message.noti}
            </div>
          </>
          :
          <>
            <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)" }}>
              <div style={{ fontSize: "75px", color: "#43AA8B" }}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              {props.message.noti}
            </div>
          </>
        }
        <span onClick={(e) => {
          props.setSuccess(false)
          props.setSuccessClass("")
        }}>
          <FontAwesomeIcon className="iconc" icon={faClose} />
        </span>
      </div>
    </div>
  );
}

export default Success;