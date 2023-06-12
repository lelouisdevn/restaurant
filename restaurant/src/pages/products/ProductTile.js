import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './this.css';
import './tiles.css'
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import VND from '../../components/currency';
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

  const [blurtile, setBlurTile] = useState("");
  useEffect(() => {
    if (props.criteria != "2" && product.prod_status === false) {
      setBlurTile("blurtile");
    }else {
      setBlurTile("");
    }
  }, []);
  useEffect(() => {
    if (props.criteria != "2" && product.prod_status === false) {
      setBlurTile("blurtile");
    }else {
      setBlurTile("");
    }
  }, [props.criteria]);

  return (
    <div className={`container ${blurtile}`} style={{position: "relattive"}}>
      {product ?
        <div>
          <Link to={`/manage/product/${product._id}`} className="fLink">
            <div className="tile">
              <img src={product.prod_img} />
            </div>
            <div className="productName">
              <h4>{product.prod_name}</h4>
              <h4>{
                  VND.format(product.prod_price)
                }</h4>
            </div>
          </Link>
          
        </div>
        : <Loading />}
    </div>
  );
}

export default ProductTitle