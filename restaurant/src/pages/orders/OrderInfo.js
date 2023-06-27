import './orders.css';

function OrderInfo({user, restaurant, nameTable }) {

    return(
        <div className="restInfo">
            <div>{restaurant.rest_name}</div>
            <div className='orderInfo'>
                <table>
                    <tr>
                        <td>Địa chỉ:</td>
                        <td>{restaurant.rest_addr}</td>
                    </tr>
                    <tr>
                        <td>Số điện thoại:</td>
                        <td>{restaurant.rest_phone}</td>
                    </tr>
                    <tr> 
                        <td>Bàn</td>
                        <td>{nameTable}</td>
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
                        <td>{user.staff_name}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default OrderInfo;