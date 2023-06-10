import { useEffect, useState } from "react"
import '../products/this.css'
import './modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const OrderModal = (props) => {
    const [orderId, setOrderId] = useState(props.order.Order);
    const [order, setOrder] = useState(props.order);

    // Set criteria to 1 and set display status of modal to false;
    const handlePay = () => {
        props.changeCriteria(1);
        props.functioner();
    }

    const getOrderInfo = async () => {
        const url = `http://localhost:4000/api/order/${orderId}`;
        await axios
            .get(url)
            .then((res) => {
                console.log(res?.data.order);
                setOrder(res?.data.order[0]);
            })
    }
    // Get order info when orderId changes;
    useEffect(() => {
        getOrderInfo();
    }, [orderId]);

    const style = {};


    // HTML template;
    return (
        <>
            <div style={props.style ? props.style : style}>
                <div className="update-modal order-modal">
                    <div className="order-modal-title">
                        <div>HOÁ ĐƠN THANH TOÁN</div>
                        <span style={{top: "1px", right: "1px"}}
                            onClick={() => props.functioner()}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </span>
                    </div>
                    <div className="order-modal-content">
                        <div>
                            {order._id}
                        </div>
                        <div>
                            {order.total}
                        </div>
                        <div>
                            {order.order_at}
                        </div>
                    </div>
                    <div className="order-modal-footer">
                        <button
                            onClick={() => 
                                // props.setCriteria(1)
                                handlePay()
                            }
                        >Thanh toán</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderModal;