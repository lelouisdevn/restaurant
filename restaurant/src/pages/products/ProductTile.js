import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './this.css';
import './tiles.css'
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
const ProductTitle = (props) => {
  const [product, setProduct] = useState(props.product);
  const [status, setStatus] = useState(true);
  useEffect(() => {
    setStatus(true);
  }, [props.isCancelled]);
  const handleClick = () => {
    props.updateSelectedProductList(product);
    setStatus(!status);
  }

  return (
    <div className="container" style={{position: "relattive"}}>
      {product ?
        <div>
          <Link to={`/manage/product/${product._id}`} className="fLink">
            <div className="tile">
              <img src={product.prod_img} />
            </div>
            <div className="productName">
              <h4>{product.prod_name}</h4>
              <h4>{product.prod_price}</h4>
            </div>
          </Link>
          <button
            className='features'
            onClick={handleClick}
          >
            {status
              ? <span>
                <FontAwesomeIcon icon={faCircle}
                style={{ color: "white", border: "solid grey 1px", borderRadius: "10px", marginRight: "5px", marginTop: "5px" }} />
              </span>
              : <FontAwesomeIcon icon={faCircle}
                style={{ 
                  color: "#1976d2", 
                  border: "solid white 1px", 
                  transition: "400ms", 
                  borderRadius: "10px", 
                  marginRight: "5px", 
                  marginTop: "5px",
                  opacity: "1",
                }} />
            }

          </button>
        </div>
        : <Loading />}
    </div>
  );
}

export default ProductTitle