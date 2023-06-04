import { useState } from "react";

function OrderDetail(props) {
    const [item, setItem] = useState(props.item);
    return(
        <>
        <tr>
            <td>{props.stt}</td>
            <td>{item.prod_name}</td>
            <td>
                <button>-</button>
                <input value={item.qty} />
                <button className="right-btn">+</button>
            </td>
            <td>{item.unit_price}</td>
            <td>{item.qty * item.unit_price}</td>
        </tr>
        </>
    );
}

export default OrderDetail;