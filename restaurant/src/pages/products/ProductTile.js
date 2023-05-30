import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './this.css';
import './tiles.css'
import Loading from './Loading';
const ProductTitle = (props) => {
  const [product, setProduct] = useState(props.product);
  return (
    <div className="container">
      { product ? 
      <Link to={`/manage/product/${product._id}`} className="fLink">
        <div className="tile">
          <img src={product.prod_img} />
        </div>
        <div className="productName">
          <h4>{product.prod_name}</h4>
          <h4>{product.prod_price}</h4>
        </div>
      </Link>
      : <Loading /> }
    </div>
  );
}

export default ProductTitle