import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Outlet } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import './this.css';
import ProductTile from './ProductTile';
import Toolbar from './Toolbar';
import axios from 'axios';
import { useState } from 'react';
import Loading from './Loading';
const ProductList = (props) => {
  const [products, setProducts] = useState("");
  const [criteria, setCriteria] = useState("0");
  const [type, setType] = useState(
    [
      'Tất cả sản phẩm',
      'Sản phẩm đang bán',
      'Sản phẩm đã ẩn'
    ]
  );

  const getProducts = async () => {
    const url = `http://localhost:4000/api/products/${criteria}`;
    await axios
      .get(url)
      .then((res) => {
        setProducts(res?.data.document)
      })
  }
  useEffect(() => {
    getProducts();
    console.log(criteria);
  }, [criteria, setCriteria]);


  return (
    <>

      <div className='detail-container' >
        <div className='fixed-header'>
          <div className="title">
            <Link to="/manage/product" className="fLink">
              <h2>QUẢN LÝ SẢN PHẨM</h2>
            </Link>
          </div>
          <Toolbar url="/manage/product/new"/>
        </div>
        {/* <Outlet /> */}
        <div className="content">
          <div className="header-product n_right_content" style={{ width: "100%" }}>
            <div className='left-menu'>
              <Link to="/manage/product" className="fLink">
                <FontAwesomeIcon icon={faHome} />
                <span> Sản phẩm</span>
                <span>/{type[criteria]}</span>
              </Link>
            </div>
            <div className='right-menu'>
              {/* <span>{criteria}</span> */}
              <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
                <option disabled selected>Bộ lọc</option>
                <option value="2">
                  Sản phẩm đã ẩn
                </option>
                <option value="1">
                  Sản phẩm đang bán</option>
                <option value="0">
                  Tất cả sản phẩm</option>
              </select>
            </div>
          </div>
          <div className="products">
            {products ? products.map((product) => (
              <ProductTile key={product._id} product={product} />
            )) : <Loading message="fetching your data...." />}
          </div>
        </div>
      </div>

    </>
  );
}

export default ProductList