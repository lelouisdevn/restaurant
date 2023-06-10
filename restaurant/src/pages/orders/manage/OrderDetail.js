import { useState } from "react";
import VND from "../../../components/currency";
import { Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
function OrderDetail(props) {
  const [itemP, setItemP] = useState(props.item.Product);
  const [qty, setQty] = useState(props.item.qty);
  const [statusO, setStatusO] = useState(props.item.status);
  console.log("item: ", props.item);
  console.log("staff: ", props.infoStaff);
  /**
   * Increase product quantity by 1 unit;
   */
  const increaseOne = (e) => {
    props.item["qty"] = parseInt(props.item.qty) + 1;
    props.updateQty(itemP);
    setQty(qty + 1);
  };

  /**
   * Decrease product quantity by 1 unit;
   */
  const decreaseOne = (e) => {
    if (qty > 1) {
      props.item["qty"] = parseInt(props.item.qty) - 1;
      props.updateQty(itemP);
      setQty(qty - 1);
    }
  };

  /**
   * HTML template;
   */
  return (
    <>
      {props.item.status === "xoa" ? (
        <tr>
          <td>
            <del>{props.stt}</del>
          </td>
          <td>
            <del>{props.item.Product.prod_name}</del>
          </td>
          <td>
            <div className="image align-center">
              <img src={props.item.Product.prod_img} />
            </div>
          </td>
          <td>
            <div className="flex align-center">
              <button onClick={decreaseOne}>-</button>

              <input value={props.item.qty} />

              <button className="right-btn" onClick={increaseOne}>
                +
              </button>
            </div>
          </td>
          <td>
            <del>{VND.format(props.item.Product.prod_price)}</del>
          </td>
          <td>
            <del>{VND.format(qty * props.item.Product.prod_price)}</del>
          </td>
          <td>
            {/* {props.infoStaff.role === "2" ? ( */}

            <select
              disable
              className="slbtn"
              value={statusO}
              onChange={(e) => setStatusO(e.target.value)}
            >
              <option value="dadat" disable selected>
                Đã gửi bếp
              </option>
              <option value="chebien">Đang chế biến</option>
              <option value="xuatmon">Xuất món</option>
              <option value="hetmon">Hết món</option>
              <option value="phucvu">Đã phục vụ</option>
            </select>

            {/* ): null} */}
          </td>
          <td>
            <DeleteForeverIcon color="disabled" />
          </td>
        </tr>
      ) : (
        <tr>
          <td>{props.stt}</td>
          <td>{props.item.Product.prod_name}</td>
          <td>
            <div className="image align-center">
              <img src={props.item.Product.prod_img} />
            </div>
          </td>
          <td>
            <div className="flex align-center">
              <button onClick={decreaseOne}>-</button>
              <input value={props.item.qty} />
              <button className="right-btn" onClick={increaseOne}>
                +
              </button>
            </div>
          </td>
          <td>{VND.format(props.item.Product.prod_price)}</td>
          <td>{VND.format(qty * props.item.Product.prod_price)}</td>
          <td>
            {/* {props.infoStaff.role === "2" ? ( */}
            <select
              className="slbtn"
              value={statusO}
              onChange={(e) => setStatusO(e.target.value)}
            >
              <option value="dadat" disable selected>
                Đã gửi bếp
              </option>
              <option value="chebien">Đang chế biến</option>
              <option value="xuatmon">Xuất món</option>
              <option value="hetmon">Hết món</option>
              <option value="phucvu">Đã phục vụ</option>
            </select>
            {/* ): null} */}
          </td>
          <td>
            <DeleteForeverIcon />
          </td>
        </tr>
      )}
    </>
  );
}

export default OrderDetail;
