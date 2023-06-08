import { faDotCircle, faEye, faList, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
function OrderListItem(props) {
    const [order, setOrder] = useState(props.order)
     const [table, setTable] = useState(props.order.table);
     const [total, setTotal] = useState(props.order.total);
   
    const seeOrderDetail = () => {
        props.handleSelectOrder(order);
    }
    return (
      <>
        <div className="orderlist-item">
          <div className="item-id">{order._id}</div>
          <div className="item-content">
            <div>{table.tbl_id}</div>
            <div>{total.total}</div>
          </div>
          <div className="item-status">
            <span onClick={seeOrderDetail}>
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span>
              <FontAwesomeIcon icon={faRemove} />
            </span>
            <span>
              <FontAwesomeIcon icon={faList} />
            </span>
          </div>
        </div>
      </>
    );
}
export default OrderListItem;