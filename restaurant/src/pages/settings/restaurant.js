import Function from "./functions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeAlt, faHomeLg, faShop } from "@fortawesome/free-solid-svg-icons";
import ProductTitle from "../products/ProductTile";
const Restaurant = () => {
    return (
        <>
            {/* <div className="content">
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
            </div> */}

            <div className="content">
                <div className="header-product n_right_content" style={{margin: "0 auto"}}>
                    <div className="left-menu">
                        <Link to={'/trinity/account/'}>
                            <FontAwesomeIcon icon={faHomeLg} />
                            <> Trang chủ</>
                        </Link>
                        /Danh sách nhà hàng
                    </div>
                </div>
                <div className="products accounts">
                    <span>
                        <Link>
                        <div className="acc-icons">
                            <FontAwesomeIcon icon={faShop} />
                        </div>
                        <div>
                            Nha hang 1
                        </div>
                        </Link>
                    </span>
                    <span>
                        <Link>
                        <div className="acc-icons">
                            <FontAwesomeIcon icon={faShop} />
                        </div>
                        <div>
                            Nha hang 2
                        </div>
                        </Link>
                    </span>
                    <span>
                        <Link>
                        <div className="acc-icons">
                            <FontAwesomeIcon icon={faShop} />
                        </div>
                        <div>
                            Nha hang 3
                        </div>
                        </Link>
                    </span>
                </div>
            </div>
        </>
    )
}
export default Restaurant;