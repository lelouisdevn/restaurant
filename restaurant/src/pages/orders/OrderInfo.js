import './orders.css';

function OrderInfo() {
    return(
        <div className="restInfo">
            <div>Nhà hàng TTT</div>
            <div className='orderInfo'>
                <table>
                    <tr>
                        <td>Địa chỉ:</td>
                        <td>Đường 3/2, phường Xuân Khánh, quận Ninh Kiều, TP. Cần Thơ</td>
                    </tr>
                    <tr>
                        <td>Nhân viên:</td>
                        <td>Ngô Trần Vĩnh Thái</td>
                    </tr>
                    <tr>
                        <td>Ngày:</td>
                        <td>{Date()}</td>
                    </tr>
                    <tr>
                        <td>Bàn</td>
                        <td>12</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default OrderInfo;