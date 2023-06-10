import './orders.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import OrderProductTile from './OrderProductTile';
import Loading from '../products/Loading';
import OrderInfo from './OrderInfo';
import OrderItem from './OrderItem';
import Success from '../products/Success';
import { useParams } from 'react-router-dom';
import VND from '../../components/currency';
function Orders() {
    const { id, name } = useParams();
    if (id !== undefined) {
        console.log("id truyen: ", id + name);
    }
    const [products, setProducts] = useState("");
    const [criteria, setCriteria] = useState("true");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [isOrdered, setTt] = useState(false);
    const [reloadOrderDetail, setReloadOrderDetail] = useState(false);
    const [total, setTotal] = useState(0);
    const [note, setNote] = useState("");

    /**
     * Pop-up banner;
     */
    const [success, setSuccess] = useState(false);
    const [successClass, setSuccessClass] = useState("");
    const [message, setMessage] = useState({});


    /**
     * User, Restaurant and Table IDs;
     */
    const [user, setUser] = useState({});
    const [restaurant, setRestaurant] = useState({});

    /**
     * Fetch product data from server;
     */
    const getProducts = async () => {
        const url = `http://localhost:4000/api/products`;
        const restaurantId = localStorage.getItem("RestaurantID");
        await axios
            .post(url, {
                restaurantId: restaurantId,
                status: criteria,
            })
            .then((res) => {
                console.log(res?.data.document);
                setProducts(res?.data.document);
            })
    }

    /**
     * Update a list of selected products;
     */
    const updateOrderList = (product) => {
        if (selectedProducts.find(prod => prod._id === product._id)) {
            setSelectedProducts(selectedProducts.filter(p => p._id !== product._id));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
        setReloadOrderDetail(!reloadOrderDetail);
    }
    /**
     * Update product quantity;
     */
    const updateQty = (product) => {
        const prod = selectedProducts.indexOf(product);
        selectedProducts[prod] = product;
        setSelectedProducts(selectedProducts);
        setReloadOrderDetail(!reloadOrderDetail);
    }

    /**
     * Remove all selected products;
     */
    const discardAll = () => {
        setSelectedProducts([]);
        setTt(!isOrdered);
    }

    /**
     * Calculate the total payment when selected products or product quantity changes;
    */
    useEffect(() => {
        let total = 0;
        selectedProducts.forEach((product) => {
            total += (parseInt(product.qty) * parseInt(product.prod_price));
        })
        setTotal(total);
    }, [reloadOrderDetail]);

    /**
     * 
    */
    useEffect(() => {
        getProducts();
    }, [selectedProducts]);

    /**
     * Get User Informatioin with Id;
     */
    const getUserInfoById = async () => {
        const userId = localStorage.getItem("UserID");
        const restaurantId = localStorage.getItem("RestaurantID");
        const getUserInfo = `http://localhost:4000/api/users/id=${restaurantId}/idUser=${userId}`;
        const response = await axios
            .get(getUserInfo)

        if (response.status == 200) {
            setUser(response.data.user[0]);
            console.log(response.data.user[0]);
        }
    }

    /**
     * Get Restaurant Information with Id:
     */
    const getRestaurantById = async () => {
        const restaurantId = localStorage.getItem("RestaurantID");
        const getRestaurantInfo = `http://localhost:4000/api/info/id=${restaurantId}`;
        const response = await axios
            .get(getRestaurantInfo)

        if (response.status == 200) {
            setRestaurant(response.data.info[0]);
        }
    }

    /**When the page is loaded; get user info and restaurant info*/
    useEffect(() => {
        getUserInfoById();
        getRestaurantById();
    }, []);

    /**
     * Silent! and OrderDetail;
     */
    const handleOrder = () => {
        if (selectedProducts.length > 0) {
            let total = 0;
            selectedProducts.forEach((product) => {
                total += (parseInt(product.qty) * parseInt(product.prod_price));
            })
            order(total);
        } else {
            const message = {
                "noti": "Vui lòng chọn sản phẩm trước khi nhấn đặt món",
                "icon": "faClose",
            };
            showModal(message);
        }
    }
    const order = async (total) => {
        const order_url = 'http://localhost:4000/api/order/new';
        const recent = new Date().toLocaleString("vi-VN", { hour12: false });
        await axios
            .post(order_url, {
                order_at: recent,
                total: total,
                user: user._id,
                note: note ? note : "",
                restaurant: restaurant._id,
            })
            .then(async (res) => {
                const order_id = res?.data.order._id;
                setOrderId(order_id);
                setTt(!isOrdered);
                await axios
                    .post(`http://localhost:4000/api/tabledetail`, {
                        table: id,
                        order: order_id
                    })
                    .then((res) => {
                        const temp = res?.data;
                        //  console.log("them chi tiet ban: ", temp);
                    });
            });
    }
    const orderDetail = async () => {
        const order_detail_url = "http://localhost:4000/api/order/detail/new";
        selectedProducts.forEach(async (product) => {
            await axios
                .post(order_detail_url, {
                    Product: product._id,
                    Order: orderId,
                    qty: product.qty,
                    unit_price: product.prod_price,
                })
                .then((res) => {
                    const message = {
                        "noti": "Thông tin đặt món đã được ghi nhận thành công",
                        "icon": "faCheckCircle",
                    };
                    showModal(message);
                })
        });
    }
    /**
    * Add order details when OrderId is created;
    */
    useEffect(() => {
        orderDetail();
        setSelectedProducts([]);
    }, [orderId]);

    /**
     * Show modal;
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

    useEffect(() => {
        console.log(note);
    }, [note]);
    /**
     * HTML template for main order page;
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
                            products
                                ? products.map(
                                    (product) =>
                                        <OrderProductTile
                                            product={product} key={product._id}
                                            functioner={updateOrderList}
                                            isOrdered={isOrdered}
                                        />)
                                : <Loading message="Đang tải dữ liệu từ server...." />
                        }
                    </div>
                </div>
                <div className="order-right">
                    <div className="order-right-content">
                        <OrderInfo user={user} restaurant={restaurant} nameTable={name} />

                        {/* Display when selected products are not empty; */}
                        {selectedProducts.length > 0 &&
                            <>
                                <h3 style={{ fontSize: "20px", margin: "10px 0" }}>YÊU CẦU ĐẶT MÓN</h3>
                                <table>
                                    <tr style={{ borderRadius: "10px 10px 0 0" }}>
                                        <td>STT</td>
                                        <td>Món</td>
                                        <td>Số lượng</td>
                                        <td>Đơn giá</td>
                                        <td style={{ width: "100px" }}>Tổng</td>
                                    </tr>
                                    {
                                        selectedProducts.map((product) => (
                                            <OrderItem
                                                key={product._id}

                                                stt={selectedProducts.indexOf(product) + 1}
                                                selectedProduct={product}
                                                functioner={updateQty}
                                            />
                                        ))
                                    }
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Tổng:</td>
                                        <td>{VND.format(total)}</td>
                                    </tr>
                                </table>
                                <div className='order-txtarea'>
                                    <div>Ghi chú:</div>
                                    <textarea onChange={(e) => setNote(e.target.value)}></textarea>
                                </div>

                                <div className='order-actions'>
                                    <div className='content'>
                                        <button className='updateButton' onClick={handleOrder} >Đặt món</button>
                                        <button className='' onClick={discardAll}>Bỏ chọn tất cả</button>
                                    </div>
                                </div>
                            </>
                        }

                    </div>

                </div>
            </div>
        </>
    );
}

export default Orders;