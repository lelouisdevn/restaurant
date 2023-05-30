import { useEffect, useState } from "react";
function OrderItem(props) {
    const [orderProduct, setOProduct] = useState(props.selectedProduct);
    const [qty, setQty] = useState(1);

    /**
     * Increase and decrease product quantity;
     */
    const increase = () => {
        setQty(qty + 1);
        orderProduct['qty'] = qty + 1;
        props.functioner(orderProduct);
    }
    const decrease = () => {
        if (qty>0 && qty-1 != 0) {
            setQty(qty - 1);
            orderProduct['qty'] = qty - 1;
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
                <button 
                    onClick={decrease}
                >-</button>
                <input value={qty} onChange={(e) => setQty(e.target.value)} />
                <button className="right-btn"
                    onClick={increase}
                >+</button>
            </td>
            <td>{orderProduct.prod_price}</td>
            <td>{qty * orderProduct.prod_price}</td>
        </tr>
    )
}

export default OrderItem;