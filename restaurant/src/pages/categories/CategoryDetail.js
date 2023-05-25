import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Toolbar from '../products/Toolbar';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ProductImage from '../products/ProductImage';
import '../products/this.css'
const CategoryDetail = () => {
    const categories = [
        { '_id': '2b4cbrb7yrshb', 'cate_name': 'food', 'category_img': 'https://media.istockphoto.com/id/477338550/vector/fast-food-cartoon-set.jpg?s=170667a&w=0&k=20&c=r-ZAh_cU7Fue1KJI34kUSfe-5SuHlLywuxfXv1MrdqM=' },
        { '_id': '2b4098b7yrshb', 'cate_name': 'drink', 'category_img': 'https://bakewithshivesh.com/wp-content/uploads/2022/04/IMG_9331-scaled.jpg' }
    ]
    const { id } = useParams();
    const item = categories.find((e) => e._id === id);
    const [category, setCategory] = useState(item);

    const [categoryName, setCategoryname] = useState(category.cate_name);

    function discardAll() {
        setCategoryname(category.cate_name)
    }

    function updateAll() {
        category.cate_name = categoryName;
        setCategory(category);
    }
    const [status, setStatus] = useState(false)
    return (
        <>

            {
                status &&
                <div className='img-container'>
                    <img className='fullScreenImage' src={category.category_img} />
                    <div onClick={(e) => setStatus(!status)}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
            }
            {!status &&
                <div className='detail-container'>
                    <div className="title">
                        <Link to="/manage/category" className="fLink">
                            <h2>CATEGORY MANAGEMENT</h2>
                        </Link>
                    </div>
                    <Toolbar />
                    <Outlet />
                    <div className="content">
                        <div className="header-product">
                            <Link to="/manage/category" className="fLink">
                                <FontAwesomeIcon icon={faHome} />
                                <span> Category</span>
                            </Link>
                            /
                            <Link to="/products/foods" className="fLink">
                                <span>{categoryName}</span>
                            </Link>
                        </div>
                        <div className="product-content">
                            <div className="n_left">
                                <div>
                                    <ProductImage img={category.category_img} />
                                </div>
                                <div>
                                    <button className='updateButton' onClick={(e) => setStatus(!status)}>
                                        FullScreen
                                    </button>
                                </div>
                            </div>
                            <div className="n_right">
                                <div className='n_right_content'>
                                    <div>
                                        <label>Name:</label>
                                        <input
                                            value={categoryName}
                                            // onChange={(event) => setProdName(event.target.value)}
                                        ></input>
                                    </div>
                                    <div>
                                        <label>Image URL:</label>
                                        <input value={category.category_img}></input>
                                    </div>
                                    <div>
                                        <button className='updateButton' onClick={updateAll}>Update changes</button>
                                        <button onClick={discardAll}>Discard changes</button>
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

export default CategoryDetail;