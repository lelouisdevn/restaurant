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
  const [products, setProducts] = useState([]);
  const [criteria, setCriteria] = useState("0");
  const [query, setQuery] = useState("");
  const [type, setType] = useState(
    [
      'Tất cả sản phẩm',
      'Sản phẩm đang bán',
      'Sản phẩm đã ẩn'
    ]
  );
  const [message, setMessage] = useState("Đang tải dữ liệu từ server....");

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

  /**
 * Update search query when changes happen on input; 
 */
  const getSearchQuery = (s_query) => {
    setQuery(s_query);
  };
  /**
   * Filter products that match the search query; 
   */
  useEffect(() => {
    if (query === "") {
      getProducts();
    }

    const filterBySearch = products.filter((product) => {
      let name = product.prod_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      let mquery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (name.includes(mquery)) {
        return product;
      }
    });

    setProducts(filterBySearch);
    if (filterBySearch.length == 0 && query != "") {
      setMessage(`Không tìm thấy sản phẩm với từ khóa "${query}"`);
    }
  }, [query]);

  return (
    <>

      <div className='detail-container' >
        <div className='fixed-header'>
          <div className="title">
            <Link to="/manage/product" className="fLink">
              <h2>QUẢN LÝ SẢN PHẨM</h2>
            </Link>
          </div>
          <Toolbar url="/manage/product/new" functioner={getSearchQuery} search={true} />
          {/* { query } */}
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
            {products.length > 0 ? products.map((product) => (
              <ProductTile key={product._id} product={product} />
            )) : <Loading message={message} />}
          </div>
        </div>
      </div>

    </>
  );
}

export default ProductList