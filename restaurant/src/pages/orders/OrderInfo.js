import './orders.css';

function OrderInfo(props) {
    return(
        <div className="restInfo">
            <div>{props.restaurant.rest_name}</div>
            <div className='orderInfo'>
                <table>
                    <tr>
                        <td>Địa chỉ:</td>
                        <td>{props.restaurant.rest_addr}</td>
                    </tr>
                    <tr>
                        <td>Số điện thoại:</td>
                        <td>{props.restaurant.rest_phone}</td>
                    </tr>
                    <tr>
                        <td>Bàn:</td>
                        <td>201</td>
                    </tr>
                    <tr>
                        <td>Nhân viên:</td>
                        <td>{props.user.staff_name}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default OrderInfo;