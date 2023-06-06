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
  const [url, setUrl] = useState({
    "add": "/manage/product/new",
    "hide": "product/hide"
  })
  const [products, setProducts] = useState([]);
  const [criteria, setCriteria] = useState(0);
  const [query, setQuery] = useState("");
  const [type, setType] = useState(
    [
      {
        "name": 'Tất cả sản phẩm', 
        "status": "",
      },
      {
        "name": 'Sản phẩm đang bán', 
        "status": "true",
      },
      {
        "name": 'Sản phẩm đã ẩn',
        "status": "false",
      },
    ]
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("Đang tải dữ liệu từ server....");
  const [isSorted, setSort] = useState("false");

  /**
   * Get all products of a restaurant from server;
   */
  const getProducts = async () => {
    const restaurantId = localStorage.getItem("RestaurantID");
    const url = `http://localhost:4000/api/products`;
    await axios
      .post(url, {
        restaurantId: restaurantId,
        status: type[criteria].status,
      })
      .then((res) => {
        setProducts(res?.data.document)
      })
  }
  useEffect(() => {
    getProducts();
  }, [criteria, setCriteria]);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
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

  /** Sort products*/
  const sortAZ = () => {
    const sortedProducts = products.sort((a,b)=> {
      if (a.prod_name < b.prod_name) {
        return -1;
      }else if (a.prod_name > b.prod_name) {
        return 1;
      }
      return 0;
    });
    setProducts(sortedProducts);
    setSort("sortaz");
  }
  const sortZA = () => {
    const sortedProducts = products.sort((a,b)=> {
      if (a.prod_name < b.prod_name) {
        return 1;
      }else if (a.prod_name > b.prod_name) {
        return -1;
      }
      return 0;
    });
    setProducts(sortedProducts);
    setSort("sortza");
  }
  const sort = () => {
    if (isSorted === "sortaz") {
      sortZA();
    }else {
      sortAZ();
    }
  }

  return (
    <>

      <div className='detail-container' >
        <div className='fixed-header'>
          <div className="title">
            <Link to="/manage/product" className="fLink">
              <h2>QUẢN LÝ SẢN PHẨM</h2>
            </Link>
          </div>
          <Toolbar url={url} functioner={getSearchQuery} search={true} sort={sort} sortType={isSorted} />
        </div>
        <div className="content">
          <div className="header-product n_right_content" style={{ width: "100%" }}>
            <div className='left-menu'>
              <Link to="/manage/product" className="fLink">
                <FontAwesomeIcon icon={faHome} />
                <span> Sản phẩm</span>
                <span>/{type[criteria].name}</span>
              </Link>
            </div>
            <div className='right-menu'>
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