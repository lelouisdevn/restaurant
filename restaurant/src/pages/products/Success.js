import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import './this.css';
import { useNavigate } from "react-router-dom";
function Success(props) {
  const navigate = useNavigate();
  const style = {
    width: "100%",
    height: "calc(100vh - 64px)",
    position: "absolute",
    zIndex: 10,
  };
  const deleteOrder = () => {
    props.functioner("huydon");
  }
  const hidePopup = () => {
    props.setSuccess(false)
    props.setSuccessClass("")
    if (props.redirect) {
      navigate(props.redirect);
    }
  }
  return (
    <div style={props.style ? props.style : style}>
      <div className='update-modal'>
        {props.message.icon == "faClose"
          ?
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
            {props.message.icon == "faTrash"
              ?
              <>
                <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", padding: "0 10px" }}>
                  <div style={{ fontSize: "75px", color: "crimson" }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                  <div>{props.message.noti}</div>
                  <button className="btn-dlt" onClick={deleteOrder} >Xóa</button>
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
          </>
        }
        <span onClick={(e) => {
          hidePopup();
        }}>
          <FontAwesomeIcon className="iconc" icon={faClose} />
        </span>
      </div>
    </div>
  );
}

export default Success;
