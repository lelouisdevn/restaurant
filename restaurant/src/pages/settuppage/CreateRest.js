import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import LeftNavigate from "./LeftNavigate";
const CreateRest = () => {
    return(
        <>
            <LeftNavigate url={"/setting-up/select"} />
            <div>
                Tạo một nhà hàng mới
            </div>
            <div className="main-content" style={{overflowY: "hidden",height: "45%"}}>
                <input placeholder="Tên nhà hàng...." />
                <input placeholder="Địa chỉ..." />
                <input placeholder="Số điện thoại..." />
                <input placeholder="Mô tả....." />
            </div>
            <div className="footer">
                <FontAwesomeIcon icon={faAdd} />
                <> Thêm</>
            </div>
        </>
    );
}

export default CreateRest;