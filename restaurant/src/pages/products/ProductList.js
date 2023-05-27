import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Outlet } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import './this.css';
import ProductTile from './ProductTitle';
import Toolbar from './Toolbar';
import axios from 'axios';
import { useState } from 'react';
import Loading from './Loading';
const ProductList = () => {
  const url = "http://localhost:4000/api/products";
  const [products, setProducts] = useState("");

  const getProducts = async () => {
    await axios
      .get(url)
      .then((res) => {
        console.log(res?.data.document);
        setProducts(res?.data.document)
      })
  }
  useEffect(() => {
    getProducts();
  }, []);
  

  return (
    <>

      <div >
        <div className="title">
          <Link to="/manage/product" className="fLink">
            <h2>QUẢN LÝ SẢN PHẨM</h2>
          </Link>
        </div>
        <Toolbar url="/manage/product/new" />
        <Outlet />
        <div className="content">
          <div className="header-product">
            <Link to="/manage/product" className="fLink">
              <FontAwesomeIcon icon={faHome} />
              <span> Sản phẩm</span>
            </Link>
          </div>
          <div className="products">
            {products ? products.map((product) => (
              <ProductTile key={product._id} product={product} />
            )) : <Loading message="fetching your data...." />}

            {/* <Loading /> */}
          </div>
        </div>
      </div>


    </>
  );
}

export default ProductList