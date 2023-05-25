import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ProductImage from './ProductImage';
import Toolbar from './Toolbar';
import { faClose } from '@fortawesome/free-solid-svg-icons';
function ProductForm() {
    const product = {
        'id': '',
        'product_name': '',
        'product_img': 'https://static.vecteezy.com/system/resources/previews/005/988/954/original/hidden-icon-free-vector.jpg',
        'product_price': '',
        'category': 'food'
    }
    const [prod, setProduct] = useState(product);

    const [product_name, setProdName] = useState(product.product_name);
    const [product_price, setProdPrice] = useState(product.product_price);
    const [product_cate, setProdCate] = useState(product.category);
    const [product_img, setProdImg] = useState(product.product_img);

    function discardAll() {
        setProdName(prod.product_name);
        setProdPrice(prod.product_price);
        setProdCate(prod.category);
        setProdImg(prod.product_img)
    }

    function updateAll() {
        product.product_name = product_name;
        product.product_price = product_price;
        product.category = product_cate;
        product.product_img = product_img;
        setProduct(product);
    }
    return (
        <div className='detail-container'>
            <div className='title'>
                <h2>QUẢN LÝ SẢN PHẨM</h2>
            </div>
            <Toolbar />
            <div className='content'>
                <div className="header-product">
                    <Link to="/manage/product" className="fLink">
                        <FontAwesomeIcon icon={faHome} />
                        <span> Sản phẩm/thêm sản phẩm mới</span>
                    </Link>
                </div>
                <div className='product-content'>
                    <div className='n_left'>
                        <div>
                            <ProductImage img={product_img} />
                        </div>
                    </div>
                    <div className='n_right'>
                        <div className='n_right_content'>
                            
                            <div>
                                <label>Tên sản phẩm:</label>
                                <input
                                    value={product_name}
                                    onChange={(event) => setProdName(event.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label>Danh mục: {product_cate}</label>
                                <div>
                                    <select onClick={(e) => setProdCate(e.target.value)}>
                                        <option value={"food"}> Thực phẩm</option>
                                        <option value={"drink"}> Thức uống</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label>Đơn vị tính:</label>
                                <input></input>
                            </div>
                            <div>
                                <label>Đơn giá:</label>
                                <input
                                    value={product_price}
                                    onChange={(event) => setProdPrice(event.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label>Đường dẫn hình ảnh:</label>
                                <input value={product_img} onChange={(e) => setProdImg(e.target.value)}></input>
                            </div>
                            <div>
                                <label>Mô tả sản phẩm:</label>
                                <input></input>
                            </div>
                            <div>
                                <button className='updateButton' onClick={updateAll}>Lưu các thay đổi</button>
                                <button onClick={discardAll}>Bỏ các thay đổi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;