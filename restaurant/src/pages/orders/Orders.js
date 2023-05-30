import './orders.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import OrderProductTile from './OrderProductTile';
import Loading from '../products/Loading';
import OrderInfo from './OrderInfo';
import OrderItem from './OrderItem';

function Orders() {
    const [products, setProducts] = useState("");
    const [criteria, setCriteria] = useState("0");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderId, setOrderId] = useState("6475fb5e28f89e57150563b4");
    const [isOrdered, setTt] = useState(false);

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
        if (selectedProducts.find(prod => prod._id == product._id)) {
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
        console.log(selectedProducts);
    }

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
    const order = async () => {
        const order_url = 'http://localhost:4000/api/order/new';
        await axios
            .post(order_url, {

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
        });
    }


    /**
     * HTML template for main order page;
    */
    return (
        <div className="order-container">
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
                    <OrderInfo />
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
                    <div className='order-actions'>
                        <button className='updateButton' onClick={order} >Đặt món</button>
                        <button className='updateButton'>Hủy đặt món</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Orders;