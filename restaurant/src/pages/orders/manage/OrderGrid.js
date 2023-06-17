import { Link } from 'react-router-dom';
import '../../products/grid.css'
import VND from '../../../components/currency';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
function OrderGrid (props) {
    const [order, setOrder] = useState("");
    useEffect(() => {
        setOrder(props.order);
    }, []);
    const formatStatus = {
        "dadat": "Đã đặt món",
        "dathanhtoan": "Đã thanh toán",
        "dahuy": "Đã hủy đơn hàng"
    }
return(
    <>
        { order &&
        <tr>
            <td>{props.stt}</td>
            <td>{order._id}</td>
            <td>{order.order_at}</td>
            <td>{VND.format(order.total)}</td>
            <td>
                <select value={order.status}>
                    <option value="dadat">
                        Đã đặt món
                    </option>
                    <option value="dathanhtoan">
                        Đã thanh toán
                    </option>
                    <option value="dahuy">
                        Đã hủy đơn hàng
                    </option>
                </select>
            </td>
            <td>
                <FontAwesomeIcon icon={faEye} />
                <FontAwesomeIcon icon={faTrash} />
                <FontAwesomeIcon icon={faEdit} />
            </td>
        </tr>
        }
    </>
)
}

export default OrderGrid;