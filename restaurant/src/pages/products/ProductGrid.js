import { Link } from 'react-router-dom';
import './grid.css'
import VND from '../../components/currency';
import { useState, useEffect } from 'react';
function ProductGrid (props) {
    const evenRows = {
        background: "aliceblue",
        height: "fit-content"
    }
    const [even, setEven] = useState({});
    useEffect(() => {
        if (props.stt % 2 === 0) {
            setEven(evenRows);
        }else {
            setEven({});
        }
    }, []);
return(
    <>
        <div className="product-grid" style={even}>
            <div style={{width: "6%"}}>
                {props.stt}
            </div>
            <div>
                <Link to={`/manage/product/${props.product._id}`}>
                {props.product.prod_name}
                </Link>
            </div>
            <div>{VND.format(props.product.prod_price)}</div>
            <div>{props.product.prod_unit}</div>
            <div className='product-grid-desc'>{props.product.prod_desc}</div>
            <div>
                {props.product.prod_img}
            </div>
        </div>
    </>
)
}

export default ProductGrid;