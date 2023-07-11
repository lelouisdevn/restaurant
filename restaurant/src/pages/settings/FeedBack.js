import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const FeedBack = (props) => {
    const style = {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: "0",
        zIndex: "11",
        top: "0",
    };
    return(
        <div style={style}>
                <div className={`update-modal order-modal`} style={{height: "fit-content"}}>
                    <div className="order-modal-title">
                        <div>Service Feedback</div>
                        <span style={{ top: "1px", right: "1px" }} onClick={() => {
                            props.setSelected(true)
                            props.setSuccessClass("")
                        }
                        }>
                            <FontAwesomeIcon icon={faClose} />
                        </span>
                    </div>
                    <div className="order-modal-content">
                        <div className="order-container main-content" style={{height: "fit-content"}}>
                            <>Please fill in these fields and submit for feedback</>
                            <input placeholder="Your email: " />
                            <input placeholder="Your phone number: " />
                            <input placeholder="Type of feedback: " type="select" />
                            <textarea placeholder="Describe your problem here..." rows={10}></textarea>
                            <button className="updateButton">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default FeedBack;