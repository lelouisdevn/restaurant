import './orders.css';

function OrderInfo(props) {
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
                        <td>Bàn:</td>
                        <td>201</td>
                    </tr>
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