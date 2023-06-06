import './orders.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import OrderProductTile from './OrderProductTile';
import Loading from '../products/Loading';
import OrderInfo from './OrderInfo';
import OrderItem from './OrderItem';
import Success from '../products/Success';
import { useParams } from 'react-router-dom';
function Orders() {
    const { id , name} = useParams();
    if (id !== undefined) {
      console.log("id truyen: ", id+ name);
    }
    const [products, setProducts] = useState("");
    const [criteria, setCriteria] = useState("1");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderId, setOrderId] = useState("6475fb5e28f89e57150563b4");
    const [isOrdered, setTt] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successClass, setSuccessClass] = useState("");
    const [message, setMessage] = useState({});

    /**
     * Fetch product data from server;
     */
    const getProducts = async () => {
        const url = `http://localhost:4000/api/products/${criteria}`;
        await axios
            .get(url)
            .then((res) => {
                setProducts(res?.data.document)
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
    }
    /**
     * Update product quantity;
     */
    const updateQty = (product) => {
        const prod = selectedProducts.indexOf(product);
        selectedProducts[prod] = product;
        setSelectedProducts(selectedProducts);
        // setSelectedProducts(selectedProducts.filter(p => p.qty > 0));
    }
    const discardAll = () => {
        setSelectedProducts([]);
        setTt(!isOrdered);
    }
    // useEffect(() => {

    // }, [])

    /**
     * first: get all products;
     * second: insert order details;
     * third: get total number of money for this order;
    */
    useEffect(() => {
        getProducts();
    }, [selectedProducts]);
    
    useEffect(() => {
        console.log(orderId);
        orderDetail();
        setSelectedProducts([]);
    }, [orderId]);

    /**
     * Silent! and OrderDetail;
     */
    const handleOrder = () => {
        if (selectedProducts.length > 0) {
            order();
        }else {
            const message = {
                "noti": "Vui lòng chọn sản phẩm trước khi nhấn đặt món",
                "icon": "faClose",
            };
            showModal(message);
        }
    }
    const order = async () => {
        const order_url = 'http://localhost:4000/api/order/new';
        const recent = new Date().toLocaleString("vi-VN", {hour12: false});
        await axios
            .post(order_url, {
                order_at: recent,
                user: "6472e71067760e2a1599227b",
                table: "646f2abd6ab932270421cff5",
                restaurant: "64730496807c841ff6a953a3",
            })
            .then((res) => {
                const order_id = res?.data.order._id;
                setOrderId(order_id);
                setTt(!isOrdered);
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
    const showModal = (message) => {
        setSuccess(true);
        setSuccessClass("opacity-success");
        // setMessage("Thông tin đặt món đã được ghi nhận thành công");
        setMessage(message);
        setTimeout(() => {
          setSuccess(false);
          setSuccessClass("");
        }, 3000);
      }

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
                            : <Loading message="loading products...." />
                    }
                </div>
            </div>
            <div className="order-right">
                <div className="order-right-content">
                        <OrderInfo nameTable={name}  />
                    
                    {/* Display when selected products are not empty; */}
                    { selectedProducts.length > 0 &&
                    <>
                    <h3 style={{fontSize: "20px", margin: "10px 0"}}>YÊU CẦU ĐẶT MÓN</h3>
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
                                    
                                    stt={selectedProducts.indexOf(product)}
                                    selectedProduct={product}
                                    functioner={updateQty}
                                />
                            ))
                        }
                    </table>
                    </>
                    }
                    <div className='order-actions'>
                        <div className='content'>
                        <button className='updateButton' onClick={handleOrder} >Đặt món</button>
                        <button className='' onClick={discardAll}>Bỏ chọn tất cả</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default Orders;