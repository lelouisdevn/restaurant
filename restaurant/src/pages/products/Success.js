import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
function Success(props) {
  return (
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