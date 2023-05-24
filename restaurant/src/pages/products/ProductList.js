import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Outlet } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import './this.css';
import ProductTile from './ProductTitle';
import Toolbar from './Toolbar';

const ProductList = () => {
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
  return (
    <>

      <div >
        <div className="title">
          <Link to="/manage/product" className="fLink">
            <h2>PRODUCTS MANAGEMENT</h2>
          </Link>
        </div>
        <Toolbar />
        <Outlet />
        <div className="content">
          <div className="header-product">
            <Link to="/manage/product" className="fLink">
              <FontAwesomeIcon icon={faHome} />
              <span> Products</span>
            </Link>
          </div>
          <div className="products">
            {products.map((product) => (
              <ProductTile key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>


    </>
  );
}

export default ProductList