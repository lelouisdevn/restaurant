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
      _id: "39jfu34e8u32e",
      product_name: "Hamburger",
      product_price: "40000",
      product_img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/NYC-Diner-Bacon-Cheeseburger.jpg/1200px-NYC-Diner-Bacon-Cheeseburger.jpg',
      category: "food"
    },
    {
      _id: "cad989453nbui3fb58",
      product_name: "Vietnamese Pho",
      product_price: "35000",
      product_img:
        'https://static01.nyt.com/images/2023/03/22/multimedia/16korex1-pho-ltgp/16korex1-pho-ltgp-mediumSquareAt3X.jpg',
      category: "food"
    },
    {
      _id: "f90endjsldijw",
      product_name: "Artichoke Tea",
      product_price: "27000",
      product_img:
        "https://cdn.shopify.com/s/files/1/0004/6379/8334/products/atiso_2048x.jpg?v=1567501693",
      category: "drink"
    },
    {
      _id: "cre8743nd029u39r9n7xn3",
      product_name: "Peach Tea",
      product_price: "55000",
      product_img: 'https://static.toiimg.com/photo/84818808.cms',
      category: "drink"
    },
    {
      _id: "f4ir9nc48cby",
      product_name: "Vietnamese Coffee",
      product_price: "45000",
      product_img:
        "https://product.hstatic.net/1000075078/product/1675355354_bg-tch-sua-da-no_30c87dcd6cb84819be30aebd65abdb4c_large.jpg",
      category: "drink"
    },
    {
      _id: "7nvhf9984927bf7396r8b",
      product_name: "French Champagne",
      product_price: "45000",
      product_img:
        "https://my-french-grocery.com/wp-content/uploads/2018/05/moet-et-chandon.jpg",
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
        <Toolbar url="/manage/product/new" />
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