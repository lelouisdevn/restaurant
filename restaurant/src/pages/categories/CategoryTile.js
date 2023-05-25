import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../products/this.css';
import '../products/tiles.css'
const CategoryTile = (props) => {
  const [category, setCategory] = useState(props.category);
  return (
    <div className="container">
      <Link to={`${category._id}`} className="fLink">
        <div className="tile">
          <img src={category.category_img} />
        </div>
        <div className="productName">
          <h4>{category.cate_name}</h4>
          {/* <h4>{category.categroy_}</h4> */}
        </div>
      </Link>
    </div>
  );
}

export default CategoryTile;