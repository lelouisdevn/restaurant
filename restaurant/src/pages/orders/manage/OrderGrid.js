import { Link } from 'react-router-dom';
import '../../products/grid.css'
import VND from '../../../components/currency';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faDotCircle, faEdit, faEye, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import './order-grid.css';
import '../../products/this.css';
import axios from 'axios';
function OrderGrid (props) {
    const HOST = "http://localhost:4000/api";
    const [order, setOrder] = useState("");
    const [tables, setTables] = useState([]);

    const getTables = async () => {
        const url = `${HOST}/order/${props.order._id}/tables`;
        await axios
            .get(url)
            .then((res) => {
                console.log("ban: ", res?.data.tables);
                setTables(res?.data.tables);
            })
    }
    useEffect(() => {
        setOrder(props.order);
        getTables();
        console.log(order)
    }, []);
    const formatStatus = {
        "dadat": "Đã đặt món",
        "dathanhtoan": "Đã thanh toán",
        "dahuy": "Đã hủy đơn hàng"
    }
    const [status, setStatus] = useState(props.order.status);
    const [updating, setUpdating] = useState(true);
    const payOrder = async () => {
        setUpdating(false);
        const url = `${HOST}/order/update`;
        const res = await axios
            .post(url, {
                orderId: order._id,
                criteria: 1,
            })
        if (res.status === 200) {
            setStatus('dathanhtoan');
            setUpdating(true);
        }else {
            setStatus(order.status);
            setUpdating(true);
        }
    }
    const seeDetails = () => {
        props.seeDetails(order);
    }
    const evenRows = {
        background: "aliceblue",
    }
    const [even, setEven] = useState({});
    useEffect(() => {
        if (props.stt % 2 === 0) {
            setEven(evenRows);
        }else {
            setEven({});
        }
    }, []);


return(
    <>
        { order &&
        <tr style={even}>
            <td>{props.stt}</td>
            <td>{order._id}</td>
            <td>{
                tables.map((tbl) => 
                    <>{tbl.tables[0].tbl_id},</>
                )
            }</td>
            <td>{new Date(order.order_at).toLocaleString("vi-VN", {hour12: false})}</td>
            <td>{VND.format(order.total)}</td>
            <td>
                {
                    updating ?
                
                    
                        status !== 'dathanhtoan' ?

                            status === 'dahuy' ?
                                <button
                                    disabled={true}
                                    style={{ background: "#FFA737", border: "solid 1px #FFA737", color: "black" }}
                                > Đã hủy</button>
                                : <button
                                    onClick={() => payOrder()}
                                    className='updateButton'
                                > Thanh toán</button>

                            // : <button className='updateButton'> Đã thanh toán</button>
                            :
                            <button
                                disabled={true}
                                style={{ background: "lightgrey", border: "solid 1px lightgrey", color: "black" }}
                            > Đã thanh toán</button>
                    : <button className='updateButton'>
                        <FontAwesomeIcon icon={faCircleDot} />
                        <> Cập nhật...</>
                    </button>
                    
                }
            </td>
            <td>
                <span>
                    <FontAwesomeIcon icon={faEye} onClick={seeDetails} />
                </span>
            </td>
        </tr>
        }
    </>
)
}

export default OrderGrid;