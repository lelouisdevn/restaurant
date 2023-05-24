import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ProductImage from './ProductImage';
import Toolbar from './Toolbar';
import { faClose } from '@fortawesome/free-solid-svg-icons';
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
      _id: "cre8743nd029u39r9n7xn3",
      product_name: "Peach Tea",
      product_price: "55000",
      product_img: 'https://static.toiimg.com/photo/84818808.cms',
      category: "drink"
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
  const [status, setStatus] = useState(false)
  return (
    <>
      
        {
          status && 
          <div className='img-container'>
            <img className='fullScreenImage' src={product.product_img} />
            <div onClick={(e) => setStatus(!status)}>
              <FontAwesomeIcon icon={faClose} />
            </div>
          </div>
        }
      { !status &&
      <div className='detail-container'>
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
              <div>
                <button className='updateButton' onClick={(e) => setStatus(!status)}>
                  FullScreen
                  </button>
              </div>
            </div>
            <div className="n_right">
              <div className='n_right_content'>
                {/* <div>
                <label>ID:</label>
                <input value={product._id} disabled></input>
              </div> */}
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
                  <button className='updateButton' onClick={updateAll}>Update changes</button>
                  <button onClick={discardAll}>Discard changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
}

export default ProductDetail