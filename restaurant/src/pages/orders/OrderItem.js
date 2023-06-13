import { useEffect, useState } from "react";
import VND from '../../components/currency';
function OrderItem(props) {
    const [orderProduct, setOProduct] = useState(props.selectedProduct);
    const [qty, setQty] = useState(1);

    /**
     * Increase and decrease product quantity;
     */
    const increase = () => {
        setQty(parseInt(qty) + 1);
        orderProduct['qty'] = parseInt(qty) + 1;
        props.functioner(orderProduct);
    }
    const decrease = () => {
        if (qty>0 && qty-1 !== 0) {
            setQty(parseInt(qty) - 1);
            orderProduct['qty'] = parseInt(qty) - 1;
            props.functioner(orderProduct);
        }
    }
    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value >= 0 && value <= 10) {
            setQty(value);
            orderProduct['qty'] = value;
            props.functioner(orderProduct);
        }
    }
    useEffect(() => {
        orderProduct['qty'] = qty;
        props.functioner(orderProduct);
    }, []);

    /**
     * HTML template;
    */
    return (
        <tr>
            <td>{props.stt}</td>
            <td>{orderProduct.prod_name}</td>
            <td>
                <div >
                <button 
                    onClick={decrease}
                >-</button>
                <input value={qty} onChange={handleInputChange} />
                <button className="right-btn"
                    onClick={increase}
                >+</button>
                </div>
            </td>
            <td>{VND.format(orderProduct.prod_price)}</td>
            <td>{VND.format(qty * orderProduct.prod_price)}</td>
        </tr>
    )
}

export default OrderItem;