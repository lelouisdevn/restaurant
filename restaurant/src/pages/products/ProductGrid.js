import { Link } from 'react-router-dom';
import './grid.css'
import VND from '../../components/currency';
function ProductGrid (props) {
return(
    <>
        <div className="grid">
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
            <div className='grid-desc'>{props.product.prod_desc}</div>
            <div>
                {props.product.prod_img}
            </div>
        </div>
    </>
)
}

export default ProductGrid;