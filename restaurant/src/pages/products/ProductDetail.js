import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ProductImage from './ProductImage';
import Toolbar from './Toolbar';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import axios from 'axios';
const ProductDetail = () => {
  const { id } = useParams();

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
          // console.log(res?.data.categories);
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
        category: Category ? Category : product.category
      })
    getProductById();
  }

  const deleteProduct = () => {

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
        isDisplay ?
        <div className='img-container'>
          <img className='fullScreenImage' src={product.prod_img} />
          <div onClick={(e) => setStatus(!isDisplay)}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
      :
      
        <div className='detail-container'>
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
              <Link to={`/manage/products/category/${product.category}`} className="fLink">
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
                    onClick={(e) => setStatus(!isDisplay)}
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
                            { category.category_name }
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
                    <button onClick={deleteProduct}>Xóa sản phẩm</button>
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