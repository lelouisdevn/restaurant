import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import './this.css';
function Success(props) {
  const style = {
    width: "100%",
    height: "calc(100vh - 64px)",
    position: "absolute",
    zIndex: 10,
  };
  const btnstyle = {
    margin: "15px 0",
    padding: "0 20px",
    borderRadius: "10px",
    width: "80%",
    color: "crimson",
    borderRadius: "10px",
    border: "solid 1px crimson",
    fontSize: "18px",

  };
  const deleteOrder = () => {
    props.functioner("huydon");
    // hidePopup();
  }
  const hidePopup = () => {
    props.setSuccess(false)
    props.setSuccessClass("")
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
                      <button style={btnstyle} onClick={deleteOrder}>Xoá</button>
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