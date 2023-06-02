import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ProductImage from './ProductImage';
import Toolbar from './Toolbar';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './this.css';
import Success from './Success';
const ProductDetail = () => {
  const { id } = useParams();
  console.log(id)

  /**
   * Get a product with provided id
   */
  const getProductById = async () => {
    const fetchDataURL = `http://localhost:4000/api/product/${id}`;
    await axios
      .get(fetchDataURL)
      .then((res) => {
        setProduct(res?.data.Data[0])
        setCateName(res?.data.Data[1].category_name);
      })
  }
  /**
   * Get all categories in database
   */
  const getCategories = async () => {
    const fetchCategoriesURL = "http://localhost:4000/api/categories";
    await axios
      .get(fetchCategoriesURL)
      .then((res) => {
        setCategory(res?.data.categories);
      })
  }
  /**
   * Primary states: product, categories list, category name of this product.
   */
  const [product, setProduct] = useState("");
  const [categories, setCategory] = useState("");
  const [cateName, setCateName] = useState("");
  useEffect(() => {
    getProductById();
    getCategories();
  }, []);

  /**
   * 6 states below are properties of product
   */
  const [name, setName] = useState("");
  const [image, setImage] = useState("")
  const [unit, setUnit] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [Category, setCate] = useState("")
  const [stt, setStt] = useState("");
  const [success, setSuccess] = useState(false);
  const [successClass, setSuccessClass] = useState("");
  const [message, setMessage] = useState("");

  /**
   * This is to control how the image is displayed
   */
  const [isDisplay, setStatus] = useState(false)

  /**
   * Methods on products
   */
  const updateProduct = async () => {
    const updateURL = `http://localhost:4000/api/product/update/${id}`;
    await axios
      .put(updateURL, {
        prod_name: name ? name : product.name,
        prod_img: image ? image : product.img,
        prod_unit: unit ? unit : product.unit,
        prod_price: price ? price : product.price,
        prod_desc: desc ? desc : product.desc,
        category: Category ? Category : product.category,
        prod_status: stt ? stt : product.prod_status,
      })
      .then((res) => {
        showModal();
      })
    
  }
  const showModal = () => {
    setSuccess(true);
    setSuccessClass("opacity-success");
    setMessage("Thông tin sản phẩm đã được cập nhật thành công");
    getProductById();
    setTimeout(() => {
      setSuccess(false);
      setSuccessClass("");
    }, 3000);
  }
  const hideProduct = () => {
    product.prod_status = false;
    setProduct(product);
    updateProduct();
  }
  const displayProduct = () => {
    product.prod_status = true;
    setProduct(product);
    updateProduct();
  }

  const handleSelect = (event) => {
    const value = event.target.value;
    const item = categories.find(e => e.category_name == value);
    const _id = item._id;
    setCate(_id);
  }


  /**
   * HTML template
   */
  return (
    <>
      {
        success &&
        <Success setSuccess={setSuccess} setSuccessClass={setSuccessClass} message={message} />
      }
      {
        isDisplay ?
          <div className='img-container'>
            <img className='fullScreenImage' src={product.prod_img} />
            <div onClick={() => setStatus(false)}>
              <FontAwesomeIcon icon={faClose} />
            </div>
          </div>
          :


          <div className={`detail-container ${successClass}`}>

            <div className='fixed-header'>
              <div className="title">
                <Link to="/manage/product" className="fLink">
                  <h2>QUẢN LÝ SẢN PHẨM</h2>
                </Link>
              </div>
              <Toolbar url="/manage/product/new" />
            </div>
            {/* <Outlet /> */}
            <div className="content">
              {/* <div className="header-product"> */}
              <div className="header-product n_right_content" style={{ width: "100%" }}>
                <Link to="/manage/product" className="fLink">
                  <FontAwesomeIcon icon={faHome} />
                  <span> Sản phẩm</span>
                </Link>
                <Link to={`/manage/product/all/category/${product.category}`} className="fLink">
                  <span>/{cateName}</span>
                </Link>
                <span>/{product.prod_name}</span>


              </div>
              <div className="product-content">
                <div className="n_left">
                  <div>
                    <ProductImage img={product.prod_img} />
                  </div>
                  <div>
                    <button
                      className='updateButton'
                      onClick={() => setStatus(true)}
                    >
                      Toàn màn hình
                    </button>
                  </div>
                </div>
                <div className="n_right">
                  <div className='n_right_content'>
                    <div>
                      <label>Tên sản phẩm:</label>
                      <input
                        defaultValue={product.prod_name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label>Danh mục sản phẩm: {cateName}</label>
                      <div>
                        <select onClick={handleSelect} >
                          {categories && categories.map((category) => (
                            <option
                              key={category._id}
                              defaultValue={category._id}
                            >
                              {category.category_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label>Đơn vị tính:</label>
                      <input
                        defaultValue={product.prod_unit}
                        onChange={(e) => setUnit(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label>Đơn giá:</label>
                      <input
                        defaultValue={product.prod_price}
                        onChange={(e) => setPrice(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label>Đường dẫn hình ảnh:</label>
                      <input
                        defaultValue={product.prod_img}
                        onChange={(e) => setImage(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label>Mô tả sản phẩm:</label>
                      {/* <input></input> */}
                      <textarea
                        defaultValue={product.prod_desc}
                        onChange={(e) => setDesc(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <button className='updateButton' onClick={updateProduct}>Lưu các thay đổi</button>
                      {
                        product.prod_status ?
                          <button onClick={hideProduct}>Ẩn sản phẩm</button>
                          : <button onClick={displayProduct}>Hiện sản phẩm</button>
                      }
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