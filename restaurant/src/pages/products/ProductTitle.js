import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './this.css';
import './tiles.css'
const ProductTitle = (props) => {
  const [product, setProduct] = useState(props.product);
  return (
    <div className="container">
      <Link to={`${product._id}`} className="fLink">
        <div className="tile">
          <img src={product.product_img} />
        </div>
        <div className="productName">
          <h4>{product.product_name}</h4>
          <h4>{product.product_price}</h4>
        </div>
      </Link>
    </div>
  );
}

export default ProductTitle