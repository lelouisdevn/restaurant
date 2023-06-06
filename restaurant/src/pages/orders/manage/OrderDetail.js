import { useState } from "react";

function OrderDetail(props) {
    const [item, setItem] = useState(props.item);
    const [qty, setQty] = useState(props.item.qty);

    /**
     * Increase product quantity by 1 unit;
     */
    const increaseOne = (e) => {
        item['qty'] = parseInt(item.qty) + 1;
        props.updateQty(item);
        setQty(qty + 1);
    }

    /**
     * Decrease product quantity by 1 unit;
     */
    const decreaseOne = (e) => {
        // if (value - 1 != 0) {
        //     value = value - 1;
        // }
        item['qty'] = parseInt(item.qty) - 1;
        props.updateQty(item);
        setQty(qty - 1);
    }

    /**
     * HTML template;
    */
    return(
        <>
        <tr>
            <td>{props.stt}</td>
            <td>{item.prod_name}</td>
            <td>
                <button onClick={decreaseOne}>-</button>
                <input value={item.qty} />
                <button className="right-btn" onClick={increaseOne}>+</button>
            </td>
            <td>{item.unit_price}</td>
            <td>{item.qty * item.unit_price}</td>
        </tr>
        </>
    );
}

export default OrderDetail;