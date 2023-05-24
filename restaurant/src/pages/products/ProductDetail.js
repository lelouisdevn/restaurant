import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ProductImage from './ProductImage';
import Toolbar from './Toolbar';
const ProductDetail = () => {
      const products = [
        {
          _id: "a1b2c3d4e5",
          product_name: "Grilled beef",
          product_img:
            "https://twokooksinthekitchen.com/wp-content/uploads/2022/04/grilled-steak-5.jpg",
          product_price: "28000",
          category: "food"
        },
        {
          _id: "c81873bhdu",
          product_name: "Omelette",
          product_price: "25000",
          product_img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdbOnp7Z-I9jjg1TxEwraC5mr4oZ8vua6lsQ&usqp=CAU",
          category: "food"
        },
        {
          _id: "a743c00hyd",
          product_name: "Fried Chicken",
          product_price: "35000",
          product_img:
            "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg",
          category: "food"
        },
        {
          _id: "f90endjsldijw",
          product_name: "Artiso Tea",
          product_price: "27000",
          product_img:
            "https://plantshospital.com/wp-content/uploads/2020/02/Artichoke-tea.jpg",
          category: "drink"
        }
      ];
 const { id } = useParams();
 const item = products.find((e) => e._id === id);
 const [product, setProduct] = useState(item);

 const [product_name, setProdName] = useState(product.product_name);
 const [product_price, setProdPrice] = useState(product.product_price);
 const [product_cate, setProdCate] = useState(product.category);

 function discardAll() {
   setProdName(product.product_name);
   setProdPrice(product.product_price);
   setProdCate(product.category);
 }

 function updateAll() {
   product.product_name = product_name;
   product.product_price = product_price;
   product.category = product_cate;
   setProduct(product);
 }
    return (
        <>
        <div className="title">
                  <Link to="/manage/product" className="fLink">
                    <h2>PRODUCTS MANAGEMENT</h2>
                  </Link>
                </div>
                <Toolbar />
                <Outlet />
      <div className="content">
        <div className="header-product">
          <Link to="/" className="fLink">
            <FontAwesomeIcon icon={faHome} />
            <span> Products</span>
          </Link>
          /
          <Link to="/products/foods" className="fLink">
            <span>{product_cate}</span>
          </Link>
          /{product_name}
        </div>
        <div className="product-content">
          <div className="n_left">
            <div>
              <ProductImage img={product.product_img} />
            </div>
          </div>
          <div className="n_right">
            <div>
              <label>ID:</label>
              <input value={product._id} disabled></input>
            </div>
            <div>
              <label>Name:</label>
              <input
                value={product_name}
                onChange={(event) => setProdName(event.target.value)}
              ></input>
            </div>
            <div>
              <label>Category: {product_cate}</label>
              <div>
                <select onClick={(e) => setProdCate(e.target.value)}>
                  <option value={"food"}> Food</option>
                  <option value={"drink"}> Drink</option>
                </select>
              </div>
            </div>
            <div>
              <label>Unit:</label>
              <input></input>
            </div>
            <div>
              <label>Price:</label>
              <input
                value={product_price}
                onChange={(event) => setProdPrice(event.target.value)}
              ></input>
            </div>
            <div>
              <label>Image URL:</label>
              <input value={product.product_img}></input>
            </div>
            <div>
              <label>Description:</label>
              <input></input>
            </div>
            <div>
              <button onClick={updateAll}>Update changes</button>
              <button onClick={discardAll}>Discard changes</button>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}

export default ProductDetail