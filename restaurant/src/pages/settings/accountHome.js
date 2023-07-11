import Function from "./functions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeAlt } from "@fortawesome/free-solid-svg-icons";
const AccountHome = () => {
    return (
        <>
            <div className="content">
                <div className="products accounts">
                    <Function />
                </div>
            </div>
            <div className="footer">
                <div>
                    <Link to={'/manage/home'}>
                        Go to: <> </>
                        <FontAwesomeIcon icon={faHomeAlt} />
                        <> management page</>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default AccountHome;