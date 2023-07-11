import Function from "./functions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";
import '../orders/modal.css'
const AccountHome = () => {
    const [selected, setSelected] = useState(true);
    const [successClass, setSuccessClass] = useState("");
    const selectFeature = (feature) => {
        setSelected(false);
        setSuccessClass("opacity-success");
    }
    useEffect(() => {
        if (selected === 'feedback') {
            console.log('feedback');
        }
    }, [selected]);
    const style = {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: "0",
        zIndex: "11",
        top: "0",
    };
    return (
        <>
            <div className={`${successClass}`}>
                <div className="content">
                    <div className="products accounts">
                        <Function selectFeature={selectFeature} />
                    </div>
                </div>
                <div className="footer">
                    <div>
                        <Link to={'/setting-up/select'}>
                            Go to: <> </>
                            <FontAwesomeIcon icon={faHomeAlt} />
                            <> management page</>
                        </Link>
                    </div>
                </div>
            </div>
            { !selected &&
            <div style={style}>
                <div className={`update-modal order-modal`}>
                    <div className="order-modal-title">
                        <div>Feedback</div>
                        <span style={{ top: "1px", right: "1px" }} onClick={() => {
                            setSelected(true)
                            setSuccessClass("")
                        }
                        }>
                            <FontAwesomeIcon icon={faClose} />
                        </span>
                    </div>
                    <div className="order-modal-content">
                        <div className="order-container" style={{height: "calc(100vh - 150px)"}}>
                            abc
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}
export default AccountHome;