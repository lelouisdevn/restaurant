import { useState } from "react";
import OrderListItem from "./OrderListItem"
import Success from "../../products/Success";
import OrderItem from '../OrderItem'
import OrderDetail from "./OrderDetail";
import OrderInfo from '../OrderInfo'
function OrderList() {
    const [orderList, setOrderList] = useState([
        {
            "table": "107",
            "total": "80000",
            "details": [
                {
                    "id": "1",
                    "prod_name": "com ga xoi mo",
                    "qty": "2",
                    "unit_price": "25000",
                },
                {
                    "id": "2",
                    "prod_name": "nuoc mia",
                    "qty": "3",
                    "unit_price": "10000",
                }
            ],
            "order_at": "13:10:45 4/6/2023 ",
            "bill_at": "",
            "status": "dadat",
        },
        {
            "table": "201",
            "total": "95000",
            "details": [
                {
                    "id": "3",
                    "prod_name": "bun rieu cua dong",
                    "qty": "2",
                    "unit_price": "25000",
                },
                {
                    "id": "4",
                    "prod_name": "ca phe sua da",
                    "qty": "3",
                    "unit_price": "15000",
                }
            ],
            "order_at": "15:10:45 4/6/2023 ",
            "bill_at": "",
            "status": "dadat",
        }
    ]);

    const [selectedOrder, setSelectedOrder] = useState("");
    const [products, setProducts] = useState([]);
    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
        setProducts(order.details);
    }

    const [success, setSuccess] = useState(false);
    const [successClass, setSuccessClass] = useState("");
    const [message, setMessage] = useState({});

    /**
     * HTML template;
    */
    return (
        <>
            {
                success &&
                <Success setSuccess={setSuccess} setSuccessClass={setSuccessClass} message={message} />
            }
            <div className={`order-container ${successClass}`}>
                <div className="order-left">
                    <div className="order-left-content">
                        {
                            orderList
                                ? orderList.map((order) => (
                                    <OrderListItem
                                        order={order}
                                        handleSelectOrder={handleSelectOrder}
                                    />
                                ))
                                : <></>
                        }
                    </div>
                </div>
                <div className="order-right">
                    <div className="order-right-content">
                        {
                            selectedOrder &&
                            <>
                                <OrderInfo order={selectedOrder} />
                                <h3 style={{fontSize: "25px", fontWeight: "bold"}}>ĐƠN HÀNG</h3>
                                <table>
                                    <tr style={{ borderRadius: "10px 10px 0 0" }}>
                                        <td>STT</td>
                                        <td>Món</td>
                                        <td>Số lượng</td>
                                        <td>Đơn giá</td>
                                        <td style={{ width: "100px" }}>Tổng</td>
                                    </tr>
                                    {
                                        products.map((product) => (
                                            <OrderDetail
                                                stt={products.indexOf(product) + 1}
                                                key={product.id}
                                                item={product}
                                            />
                                        ))
                                    }
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Tổng hóa đơn:</td>
                                        <td>
                                            { selectedOrder.total }
                                        </td>
                                    </tr>
                                </table>
                                <div className='order-actions'>
                                    <div className='content'>
                                        {/* <button className='updateButton' >Cập nhật đơn</button> */}
                                        <select style={{padding: "10px 10px", borderRadius: "10px", border: "solid 1px lightgray"}}>
                                            <option selected disabled>Cập nhật trạng thái</option>
                                            <option>Đã đặt</option>
                                            <option>Đang chế biến</option>
                                            <option>Đã phục vụ</option>
                                            <option>Đã thanh toán</option>
                                        </select>
                                        <button>Hủy đơn</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderList;