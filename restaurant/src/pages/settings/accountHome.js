import Function from "./functions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";
import '../orders/modal.css'
import FeedBack from "./FeedBack";
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
                    <div className="single-footer">
                        <Link to={'/setting-up/select'}>
                            Đi đến: <> </>
                            <FontAwesomeIcon icon={faHomeAlt} />
                            <> trang quản lý</>
                        </Link>
                    </div>
                </div>
            </div>
            { !selected &&
            <FeedBack
                setSelected={setSelected}
                setSuccessClass={setSuccessClass}
            />
            }
        </>
    )
}
export default AccountHome;