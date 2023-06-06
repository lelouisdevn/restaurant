import './orders.css';

function OrderInfo(props) {
// function OrderInfo(props) { 
    const [restaurant, setRestaurant] = [{
        "name": "Nhà hàng TTT",
        "addr": "Đường 3/2, phường Xuân Khánh, quận Ninh Kiều, TP. Cần Thơ",
        "phone": "0123456789",
    }]
    return(
        <div className="restInfo">
            <div>{restaurant.name}</div>
            <div className='orderInfo'>
                <table>
                    <tr>
                        <td>Địa chỉ:</td>
                        <td>{restaurant.addr}</td>
                    </tr>
                    <tr>
                        <td>
                            Số điện thoại:
                        </td>
                        <td>{restaurant.phone}</td>
                    </tr>
                    <tr> 
                        <td>Bàn</td>
                        <td>{props.nameTable}</td>
                    </tr>
                    {/* <tr>
                        <td>Nhân viên:</td>
                        <td>Ngô Trần Vĩnh Thái</td>
                    </tr>
                    <tr>
                        <td>Ngày:</td>
                        <td>{new Date().toLocaleString("vi-VN", {hour12: false})}</td>
                    </tr>
                    <tr>
                        <td>Bàn</td>
                        <td>12</td>
                    </tr>
                     */} 
                    <tr>
                        <td>Nhân viên:</td>
                        <td>Ngô Trần Vĩnh Thái</td>
                    </tr>
                     
                </table>
            </div>
        </div>
    );
}

export default OrderInfo;