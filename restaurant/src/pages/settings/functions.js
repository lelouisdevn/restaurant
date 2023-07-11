import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faListUl, faLock, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
const Function = (props) => {
    return (
        <>
            <span>
                <div className="acc-icons">
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div>Account information</div>
            </span>
            <span>
                <Link to={'/trinity/account/restaurants'}>
                <div className="acc-icons">
                    <FontAwesomeIcon icon={faListUl} />
                </div>
                <div>Restaurants</div>
                </Link>
            </span>
            <span>
                <Link to={'/trinity/account/your-data'}>
                <div className="acc-icons">
                    <FontAwesomeIcon icon={faLock} />
                </div>
                <div>Your data</div>
                </Link>
            </span>
            <span onClick={() => props.selectFeature('feedback')}>
                {/* <Link to={'/trinity/account/feedback'}> */}
                    <div className="acc-icons">
                        <FontAwesomeIcon icon={faUserAstronaut} />
                    </div>
                    <div>
                        Service feedback
                    </div>
                {/* </Link> */}
            </span>
        </>
    )
}

export default Function;