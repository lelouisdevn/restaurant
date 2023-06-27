import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import './order-grid.css';
import axios from 'axios';
const OrderFilter = (props) => {
    const HOST = 'http://localhost:4000/api';
    const style = {
        height: "fit-content",
        width: "30%",
        position: "absolute"
    }
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    // const [status, setStatus] = useState("");
    const [filterCriteria, setFilterCriteria] = useState(0);

    // filter orders;
    const search = async () => {
        const url = `${HOST}/order/filter/`;
        const restaurant = JSON.parse(localStorage.getItem('infoRestaurant'));
        console.log(restaurant)
        const d = new Date().getDate();
        const m = new Date().getMonth();
        const y = new Date().getFullYear();
        const res = await axios
            .post(url, {
                restaurant: restaurant._id,
                from: fromDate ? fromDate : y+"-"+(m+1)+"-"+d,
                to: toDate ? toDate : y+"-"+(m+1)+"-"+(d+1),
                filter: filterCriteria ? filterCriteria : 0,
            })
        if (res.status === 200) {
            console.log(res?.data.orders);
            props.updateOrderList(res?.data.orders);
            props.closeModal();
        }
    }
    return (
        <div className="update-modal order-modal" style={style}>
            <div className="order-modal-title">
                <div>Bộ lọc hóa đơn</div>
                <span style={{ top: "1px", right: "1px" }}
                    onClick={() => {
                        props.closeModal();
                    }}
                >
                    <FontAwesomeIcon icon={faClose} />
                </span>
            </div>
            <div className="order-modal-content" style={{ height: "calc(100% - 100px)" }}>
                <div className="order-grid-container">
                    <div>
                        <div>Theo ngày</div>
                        <div>
                            <label>Ngày bắt đầu:</label>
                            <input type="date" onChange={(e) => setFromDate(e.target.value)} />
                        </div>
                        <div>
                            <label>Ngày kết thúc:</label>
                            <input type="date" onChange={(e) => setToDate(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <div>Trạng thái: </div>
                        <div>
                            <select onChange={(e) => setFilterCriteria(e.target.value)}>
                                <option value={0} >Đơn đã hủy</option>
                                <option value={1}>Đơn chưa thanh toán</option>
                                <option value={2}>Đơn đã thanh toán</option>
                                <option value={3}>Tất cả hóa đơn</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* <div>
                        item 3
                    </div>
                    <div>
                        item 4
                    </div> */}
                </div>
            </div>
            <div className="order-modal-footer">
                <button onClick={search}>
                    <FontAwesomeIcon icon={faSearch} />
                    <> Tìm kiếm</>
                </button>
            </div>
        </div>
    )
}

export default OrderFilter;
