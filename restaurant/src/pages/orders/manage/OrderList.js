import { useEffect, useState } from "react";
import OrderListItem from "./OrderListItem"
import Success from "../../products/Success";
import OrderItem from '../OrderItem'
import OrderDetail from "./OrderDetail";
import OrderInfo from '../OrderInfo'
function OrderList() {
    /**
     * Static data, this can be replaced with data fetched from servers;
     */
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

    /**
     * Data;
     */
    const [selectedOrder, setSelectedOrder] = useState("");
    const [products, setProducts] = useState([]);
    const [orderStatus, setOrderStatus] = useState(["dangchebien", "daphucvu",]);
    const [selectedStatus, setSelectedStatus] = useState("");
    
    /**
     * For popup notification banner;
     * This is temporarily unused;
    */ 
    const [success, setSuccess] = useState(true);
    const [successClass, setSuccessClass] = useState("opacity-success");
    const [message, setMessage] = useState({});

    /**
     * Get the order selected;
    */
    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
        const product = order.details;
        setProducts(product);
    }

    /**
     * Update product quantity;
     */
    const updateQty = (product) => {
        const index = products.indexOf(product);
        products[index] = product;
        setProducts(products);
    }

    /**
     * Show popup notification banner when an action is done;
     */
    const showModal = (message) => {
        setSuccess(true);
        setSuccessClass("opacity-success");
        setMessage(message);
        setTimeout(() => {
          setSuccess(false);
          setSuccessClass("");
        }, 3000);
      }

    /**
     * Discard any changes made previously;
     */
    const discardQtyChanges = () => {
        // getOrderById();
        let message = {
            "noti": "Các thay đổi đã được loại bỏ",
            "icon": "success",
        }
        showModal(message);
    }


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
                                                updateQty={updateQty}
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
                                        <select 
                                            style={{padding: "10px 10px", borderRadius: "10px", border: "solid 1px lightgray", margin: "0 7px"}}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                        >
                                            <option selected disabled>Cập nhật trạng thái</option>
                                            {/* <option value={1}>Đã đặt</option> */}
                                            <option value={1}>Đang chế biến</option>
                                            <option value={2}>Đã phục vụ</option>
                                            {/* <option value={4}>Đã thanh toán</option> */}
                                        </select>
                                        <button className="updateButton">Cập nhật yêu cầu</button>
                                        <button className="updateButton"
                                            onClick={discardQtyChanges}
                                        >Hoàn tác</button>
                                        <button className="updateButton">Thanh toán</button>
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