import { useState } from "react";
import VND from "../../../components/currency";

function OrderDetail(props) {
  const [item, setItem] = useState(props.item);
  const [qty, setQty] = useState(props.item.qty);
  console.log("item: ", props.item);
  /**
   * Increase product quantity by 1 unit;
   */
  const increaseOne = (e) => {
    item["qty"] = parseInt(item.qty) + 1;
    props.updateQty(item);
    setQty(qty + 1);
  };

  /**
   * Decrease product quantity by 1 unit;
   */
  const decreaseOne = (e) => {
    // if (value - 1 != 0) {
    //     value = value - 1;
    // }
    item["qty"] = parseInt(item.qty) - 1;
    props.updateQty(item);
    setQty(qty - 1);
  };

  /**
   * HTML template;
   */
  return (
    <>
      <tr>
        <td>{props.stt}</td>
        <td>{item.product.prod_name}</td>
        <td>
          <button onClick={decreaseOne}>-</button>
          <input value={item.qty} />
          <button className="right-btn" onClick={increaseOne}>
            +
          </button>
        </td>
        <td>{VND.format(item.product.prod_price)}</td>
        <td>{VND.format(item.qty * item.product.prod_price)}</td>
        <td>
          <select className="slbtn">
            <option selected disabled>
              {item.status}
            </option>
            <option>Dang che bien</option>
            <option>Da phuc vu</option>
          </select>
        </td>
      </tr>
    </>
  );
}

export default OrderDetail;
