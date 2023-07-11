import { useState, useEffect } from "react";
import './account.css';
import Function from "./functions";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeAlt, faSignOut, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const Account = () => {
    const [float, setFloat] = useState("logo-ani-prev");
    const [loading, setLoading] = useState(true);
    var style = {

    };
    useEffect(() => {
        // setLoading(true);
        setTimeout(() => {
            setFloat("")
            setLoading(false);
        }, 1000);
    }, []);
    return(
        <>
            {loading ?
            <div style={style}>
                <div className={`logo ${float}`} style={{margin: 0}}>
                    <img src='/images/logoo.png' />
                </div>
            </div>
            :
            <div className="detail-container">
                <div className="fixed-header">
                    <div className="title" style={{fontFamily:"monospace"}}>
                        Trinity&trade; Account
                    </div>
                    <div className="r-i">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </div>
                </div>
                <Outlet />
            </div>
            }
        </>
    );
}

export default Account;