import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import Success from "../products/Success";
const FeedBack = (props) => {
    const style = {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: "0",
        zIndex: "11",
        top: "0",
    };
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [problem, setProblem] = useState("");
    const HOST = "http://localhost:4000/api";
    const checkDataFormat = () => {
        if (email == "" || phone == "" || problem == "") {
            return 1;
        } else {
            return 0;
        }
    }
    const clearField = () => {
        setEmail("");
        setPhone("");
        setProblem("");
    }

    // send feedback; check data if they're valid first.
    const submit = async () => {
        if (!checkDataFormat()) {
            const URL = `${HOST}/feedback`;
            const uid = localStorage.getItem("UserID");
            await axios.post(URL, {
                content: problem,
                phone: phone,
                email: email,
                uid: uid,
            }).then((res) => {
                if (res.status === 200) {
                    setSuccess(true);
                    setSuccessClass("opacity-success");
                    clearField();

                    // Hide popup; hide feedback modal.
                    setTimeout(() => {
                        setSuccess(false);
                        setSuccessClass("");
                        props.setSelected(true);
                        props.setSuccessClass("");
                    }, 3000);
                }
            })
        } else {
            setSuccess(true);
            setSuccessClass("opacity-success");
            setMessage({
                noti: "Các trường dữ liệu không được trống!",
                icon: "faClose",
            })

            // Hide warning popup.
            setTimeout(() => {
                setSuccess(false);
                setSuccessClass("");
            }, 3000);
        }
    };
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({
        noti: "Phản hồi đã được ghi nhận!",
        icon: "faCheck",
    })
    const [successClass, setSuccessClass] = useState("");
    return (
        <>
            {
                success &&
                <Success setSuccess={setSuccess} setSuccessClass={setSuccessClass} message={message} style={{ zIndex: "2", }} />
            }
            <div style={style} className={`${successClass}`}>
                <div className={`update-modal order-modal`} style={{ height: "fit-content" }}>
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
                        <div className="order-container main-content" style={{ height: "fit-content" }}>
                            <>Please fill in these fields and submit for feedback</>
                            <input placeholder="Your email: " onChange={(e) => setEmail(e.target.value)} />
                            <input placeholder="Your phone number: " onChange={(e) => setPhone(e.target.value)} />
                            {/* <input placeholder="Type of feedback: " type="select" /> */}
                            <textarea placeholder="Describe your problem here..." rows={10}
                                onChange={(e) => setProblem(e.target.value)}
                            ></textarea>
                            <button className="updateButton" onClick={submit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FeedBack;