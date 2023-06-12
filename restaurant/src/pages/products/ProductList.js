import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Outlet, useParams } from 'react-router-dom';
import { faCancel, faChartPie, faDisplay, faEyeSlash, faFile, faHome, faRefresh, faSquare, faTable, faClose } from "@fortawesome/free-solid-svg-icons";
import './this.css';
import ProductTile from './ProductTile';
import Toolbar from './Toolbar';
import axios from 'axios';
import { useState } from 'react';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import Success from './Success';
const ProductList = (props) => {
  const [url, setUrl] = useState({
    "add": "/manage/product/new",
  })
  const [products, setProducts] = useState([]);
  const [criteria, setCriteria] = useState(1);
  const [categoryName, setCategoryName] = useState("");



  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id != undefined) {
      // setCategory(id);
      // console.log(id);
      getCategoryName();
      getProductsCategory();
    } else {
      getProducts();
    }
  }, [id]);

  const getCategoryName = async () => {
    const getCateName = `http://localhost:4000/api/category/${id}`;
    await axios
      .get(getCateName)
      .then((res) => {
        setCategoryName(res?.data.category[0].category_name);
      })
  }
  const getProductsCategory = async () => {
    const url = `http://localhost:4000/api/products/category/${id}/${criteria}`;
    const restaurantId = localStorage.getItem("RestaurantID");
    await axios
      .post(url, {
        restaurant: restaurantId,
      })
      .then((res) => {
        console.log(res?.data.products);
        setProducts(res?.data.products)
      })
  }



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
  // const [selectedCategory, setSelectedCategory] = useState("");
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
        if (res?.data.document.length == 0) {
          setMessage("Nhà hàng của bạn chưa có sản phẩm nào!");
        }
      })
    // setCategoryName("");
  }
  useEffect(() => {
    if (id == undefined) {
      getProducts();
    } else {
      getProductsCategory();
    }
  }, [criteria]);
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
      // navigate('/manage/products');
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
    const sortedProducts = products.sort((a, b) => {
      if (a.prod_name < b.prod_name) {
        return -1;
      } else if (a.prod_name > b.prod_name) {
        return 1;
      }
      return 0;
    });
    setProducts(sortedProducts);
    setSort("sortaz");
  }
  const sortZA = () => {
    const sortedProducts = products.sort((a, b) => {
      if (a.prod_name < b.prod_name) {
        return 1;
      } else if (a.prod_name > b.prod_name) {
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
    } else {
      sortAZ();
    }
  }
  const [refresh, setRefresh] = useState("");
  const refershPage = () => {
    setRefresh("refresh");
    setQuery("");
    setTimeout(() => {
      setCriteria(1); // 1 => 'sp đang bán'
      navigate('/manage/product');
      getProducts();
      setRefresh("");
    }, 1500);
  }

  const [displayType, setDisplayType] = useState("tiles");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCancelled, setCancelStatus] = useState(false);
  const updateSelectedProductList = (product) => {
    if (selectedProducts.find(prod => prod._id === product._id)) {
      setSelectedProducts(selectedProducts.filter(prod => prod._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  }
  const [success, setSuccess] = useState(false);
  const [successClass, setSuccessClass] = useState("");
  // const [message, setMessage] = useState("");
  const style = {
    width: "calc(100% - 354px)",
    height: "calc(100vh - 64px)",
    position: "absolute",
    zIndex: 10,
    left: "50%",
    transform: "translateX(-50%)",
  };
  return (
    <>
      { 
        success &&
        <Success 
          setSuccess={setSuccess}
          setSuccessClass={setSuccessClass}
          message={message}
          style={style}
        />
      }
      <div className={`detail-container ${successClass}`}>
        <div className='fixed-header'>
          <div className="title">
            <Link to="/manage/product" className="fLink">
              <h2>QUẢN LÝ SẢN PHẨM</h2>
            </Link>
          </div>
          <Toolbar
            url={url}
            functioner={getSearchQuery}
            search={true}
            sort={sort}
            sortType={isSorted}
            isSort={true}
          />
        </div>
        <div className="content">
          <div className="header-product n_right_content" style={{ width: "100%" }}>
            <div className='left-menu'>
              <Link to="/manage/product" className="fLink">
                <FontAwesomeIcon icon={faHome} />
                <span> Sản phẩm</span>
                <span>{id !== undefined && `/${categoryName}`}</span>
                <span>/{type[criteria].name}</span>
              </Link>
            </div>
            <div className='right-menu'>

              
              
              

              <span onClick={refershPage}>
                <FontAwesomeIcon icon={faRefresh} className={refresh} />
              </span>

              {
                displayType == "tiles" ?
                  <span style={{ margin: "0 5px", width: "100px" }} onClick={() => {
                    setDisplayType("grid");
                  }}>
                    <FontAwesomeIcon icon={faTable} />
                  </span> :
                  <span style={{ margin: "0 5px", width: "100px" }} onClick={() => {
                    setDisplayType("tiles");
                  }}>
                    <FontAwesomeIcon icon={faFile} />
                  </span>
              }

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
            {/* Display products as tiles or a grid  */}
            {displayType == "tiles" ?
              <>
                {products.length > 0 ? products.map((product) => (
                  <ProductTile
                    isCancelled={isCancelled}
                    key={product._id} product={product}
                    updateSelectedProductList={updateSelectedProductList}
                    criteria={criteria}
                  />
                )) : <Loading message={message} />}
              </> :
              <>
                <div className="grid" style={{ textAlign: "center", borderRadius: "10px 10px 0 0" }}>
                  <div style={{ width: "6%" }}>STT</div>
                  <div>Tên sản phẩm</div>
                  <div>Đơn giá</div>
                  <div>Đơn vị tính</div>
                  <div className='grid-desc'>Mô tả sản phẩm</div>
                  <div>Hình ảnh sản phẩm</div>
                </div>

                {
                  products.length > 0 ? products.map((product) => (
                    <ProductGrid
                      stt={products.indexOf(product) + 1}
                      key={product._id} product={product} />
                  )) : <Loading message={message} />
                }
              </>
            }
          </div>
        </div>
      </div>

    </>
  );
}

export default ProductList