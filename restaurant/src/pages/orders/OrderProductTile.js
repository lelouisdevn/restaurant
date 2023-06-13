import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../products/this.css';
import '../products/tiles.css'
import Loading from '../products/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import VND from '../../components/currency'
const OrderProductTitle = (props) => {
  const [product, setProduct] = useState(props.product);
  const [status, setStatus] = useState(true);
  useEffect(() => {
    setStatus(true);
  }, [props.isOrdered]);

  /**
   * Trigger this method when clicking;
   */
  const handleClick = () => {
    props.functioner(product);
    setStatus(!status);
  }
  return (
    <div className="container" style={{ position: "relative" }} onClick={handleClick}>

      {product ?
        <div>
          <div className="tile">
            <img src={product.prod_img} />
          </div>
          <div className="productName">
            <h4>{product.prod_name}</h4>
            <h4>{VND.format(product.prod_price)}</h4>
          </div>
          <button
            
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            {status
              ? <FontAwesomeIcon icon={faCircle}
                style={{ color: "white", border: "solid black 1px", borderRadius: "10px", marginRight: "5px", marginTop: "5px" }} />
              : <FontAwesomeIcon icon={faCircle}
                style={{ color: "#1976d2", border: "solid white 1px", transition: "400ms", borderRadius: "10px", marginRight: "5px", marginTop: "5px" }} />
            }

          </button>
        </div>

        : <Loading />}
    </div>
  );
}

export default OrderProductTitle;