import { useEffect } from "react";

const OrderFilter = () => {
    const style = {
        // width: "100%"
        height: "80%",
        position: "absolute"
    }
    // const formatDate = (date) => {
    //     let [d, m, y] = date.split('/');
    //     // console.log(d, m, y) 
    //     let fd = new Date(+y, m - 1, +d)
    //     // console.log(fd);
    //     return fd;
    // }
    // let now = formatDate("17/11/2022");
    // let aft = formatDate("20/10/2023");
    // let bef = formatDate("11/5/2022");
    // if (now >= bef && now <= aft) {
    //     console.log("yes");
    // }else {
    //     console.log('no');
    // }

    // console.log(now);
    return (
        <div className="update-modal order-modal" style={style}>
            <div className="order-modal-title">Bộ lọc hóa đơn</div>
            <div className="order-modal-content" style={{height: "calc(100% - 100px)"}}>
                <select>
                    <option></option>
                </select>
            </div>
            <div className="order-modal-footer">
                <button>
                Tìm kiếm
                </button>
            </div>
        </div>
    )
}

export default OrderFilter;