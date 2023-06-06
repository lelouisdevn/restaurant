import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ProductImage from './ProductImage';
import Toolbar from './Toolbar';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Success from './Success';
import './this.css'
function ProductForm() {
    const [name, setName] = useState("");   // product name;
    const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/005/988/954/original/hidden-icon-free-vector.jpg");
    const [unit, setUnit] = useState("");   // product unit
    const [price, setPrice] = useState(""); // product price;
    const [desc, setDesc] = useState("");   // product description;
    const [Category, setCate] = useState("");   // store selected category;
    const [categories, setCategory] = useState(""); // store categories fetched from servers;

    const [url, setUrl] = useState({
        "add": "/manage/product/new",
        "hide": "product/hide"
      })

    const [success, setSuccess] = useState(false);
    const [successClass, setSuccessClass] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate()
    /**
     * Add a new product;
     */
    const createProduct = async () => {
        const createProduct = 'http://localhost:4000/api/product/new';
        await axios
            .post(createProduct, {
                prod_name: name,
                prod_img: image,
                prod_unit: unit,
                prod_price: price,
                prod_desc: desc,
                category: Category,
                restaurant: "64730496807c841ff6a953a3",
            })
            .then((res) => {
                const id = res?.data.product._id;
                const message = {
                    "noti": "Sản phẩm đã được thêm thành công",
                    "icon": "faCheckCircle",
                  };
                showModal(message);
                setTimeout(() => {
                    navigate(`/manage/product/${id}`);
                }, 3000);
            })
    }

    /**
     * Get all product categories;
     */
    const getCategories = async () => {
        const fetchCategories = "http://localhost:4000/api/categories";
        await axios
            .get(fetchCategories)
            .then((res) => {
                setCategory(res?.data.categories);
            })
    }
    
    /**
     * Handle selecting product category;
    */
    const handleSelect = (event) => {
        const value = event.target.value;
        const item = categories.find(e => e.category_name == value);
        const _id = item._id;
        setCate(_id);
    }

    /**
     * Display pop-up noti when succeed in adding product;
     */
    const showModal = (message) => {
        setSuccess(true);
        setSuccessClass("opacity-success");
        setMessage(message);
        setTimeout(() => {
            setSuccess(false);
            setSuccessClass("");
        }, 3000);
    }

    /**
     * Fetch all categories when page loaded;
    */
    useEffect(() => {
        getCategories();
    }, []);

    const style = {
        width: "calc(100% - 354px)",
        height: "calc(100vh - 64px)",
        position: "absolute",
        zIndex: 10,
        left: "50%",
        transform: "translateX(-50%)",
      };

    /**
     * HTML template;
    */
    return (
        <>
        {
            success &&
            <Success setSuccess={setSuccess} setSuccessClass={setSuccessClass} message={message} style={style} />
        }
        <div className={`detail-container ${successClass}`}>
            <div className='fixed-header'>
            <div className='title'>
                <h2>QUẢN LÝ SẢN PHẨM</h2>
            </div>
            <Toolbar url={url} />
            </div>
            <div className='content'>
                <div className="header-product n_right_content" style={{width: "100%"}}>
                    <Link to="/manage/product" className="fLink">
                        <FontAwesomeIcon icon={faHome} />
                        <span> Sản phẩm</span>
                    </Link>
                    <span>/Thêm sản phẩm mới</span>
                </div>
                <div className='product-content'>
                    <div className='n_left'>
                        <div>
                            <ProductImage img={image} />
                        </div>
                    </div>
                    <div className='n_right'>
                        <div className='n_right_content'>

                            <div>
                                <label>Tên sản phẩm:</label>
                                <input
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label>Danh mục sản phẩm:</label>
                                <div>
                                    {/* <select onClick={(e) => setCate(e.target.value)}>
                                        <option value={"food"}> Thực phẩm</option>
                                        <option value={"drink"}> Thức uống</option>
                                    </select> */}
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
                                    defaultValue={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label>Đơn giá:</label>
                                <input
                                    defaultValue={price}
                                    onChange={(event) => setPrice(event.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label>Đường dẫn hình ảnh:</label>
                                <input
                                    defaultValue={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label>Mô tả sản phẩm:</label>
                                <input
                                    defaultValue={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <button className='updateButton' onClick={createProduct}>Thêm sản phẩm</button>
                                {/* <button>Bỏ các thay đổi</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ProductForm;