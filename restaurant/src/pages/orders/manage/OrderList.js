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
    var [orderList, setOrderList] = useState([
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
        },
        {
            "table": "603",
            "total": "75000",
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
    const [selectedStatus, setSelectedStatus] = useState(selectedOrder.status);
    
    /**
     * For popup notification banner;
     * This is temporarily unused;
    */ 
    const [success, setSuccess] = useState(false);
    const [successClass, setSuccessClass] = useState("");
    const [message, setMessage] = useState({});

    const getAllOrders = () => {

    }

    /**
     * Get the order selected;
    */
    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
        const product = order.details;
        setProducts(product);
        setSelectedStatus(order.status);
        console.log(orderList);
    }

    /**
     * Update product quantity;
     */
    const updateQty = (product) => {
        const index = products.indexOf(product);
        products[index] = product;
        setProducts(products);
    }

    // If delete request is approved, then delete;
    const changeStatus = (status) => {
        setSelectedStatus(status);
    }
    useEffect(() => {
        if (selectedStatus == "huydon") {
            deleteOrder();
        }
    }, [selectedStatus]);

    // Show a popup banner for confirmation of cancelling order;
    const confirmDeleteOrder = () => {
        setSuccess(true);
        setSuccessClass("opacity-success");
        const message = {
            "noti": "Bạn có chắc muốn xóa đơn hàng này không?",
            "icon": "faTrash",
        };
        setMessage(message);
    }

    // Delete order;
    const deleteOrderById = () => {

    }
    const deleteOrder = () => {
        deleteOrderById();
        const message = {
            "noti": "Đơn hàng đã được xóa thành công",
            "icon": "faCheckCircle",
        };
        setMessage(message);
        getAllOrders();
        setSelectedOrder("");
        setTimeout(() => {
            setSuccess(false);
            setSuccessClass("");
        }, 3000);
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
            "icon": "faCheckCircle",
        }
        showModal(message);
    }

    // Update order;
    const updateOrder = () => {

    }

    // Pay order;
    const payOrder = () => {

    }




    /**
     * HTML template;
    */

    return (
        <>
            {
                success &&
                <Success setSuccess={setSuccess} setSuccessClass={setSuccessClass} message={message} functioner={changeStatus} />
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
                            selectedOrder ?
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
                                            <option value={1}>Đang chế biến</option>
                                            <option value={2}>Đã phục vụ</option>
                                        </select>
                                        <button className="updateButton" onClick={updateOrder}>Cập nhật yêu cầu</button>
                                        <button className="updateButton"
                                            onClick={discardQtyChanges}
                                        >Hoàn tác</button>
                                        <button className="updateButton" onClick={payOrder}>Thanh toán</button>
                                        <button onClick={confirmDeleteOrder}>Hủy đơn</button>
                                    </div>
                                </div>
                            </>
                            : <div>
                                Chọn 1 order đi nào hihi    
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderList;