import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ProductImage from './ProductImage';
import Toolbar from './Toolbar';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function ProductForm() {
    // const [isDisplay, setStatus] = useState(false)
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/005/988/954/original/hidden-icon-free-vector.jpg")
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    const [Category, setCate] = useState("")
    const [categories, setCategory] = useState("");

    const navigate = useNavigate()
    const createProduct = async () => {
        const createURL = 'http://localhost:4000/api/product/new';
        await axios
            .post(createURL, {
                prod_name: name,
                prod_img: image,
                prod_unit: unit,
                prod_price: price,
                prod_desc: desc,
                category: Category
            })
            .then((res) => {
                console.log(res?.data.product._id)
                const id = res?.data.product._id;
                navigate(`/manage/product/${id}`);
            })
    }

    const getCategories = async () => {
        const fetchCategoriesURL = "http://localhost:4000/api/categories";
        await axios
            .get(fetchCategoriesURL)
            .then((res) => {
                // console.log(res?.data.categories);
                setCategory(res?.data.categories);
            })
    }
    useEffect(() => {
        getCategories();
    }, []);

    const handleSelect = (event) => {
        const value = event.target.value;
        const item = categories.find(e => e.category_name == value);
        const _id = item._id;
        setCate(_id);
      }
    return (
        <div className='detail-container'>
            <div className='fixed-header'>
            <div className='title'>
                <h2>QUẢN LÝ SẢN PHẨM</h2>
            </div>
            <Toolbar />
            </div>
            <div className='content'>
                <div className="header-product">
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
    );
}

export default ProductForm;