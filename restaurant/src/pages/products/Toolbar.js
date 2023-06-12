import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { faArrowAltCircleUp, faArrowUp, faListDots, faPlus, faSortAlphaDesc } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { faSortAlphaAsc } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
const Toolbar = (props) => {
  const [input, setInput] = useState(false);
  const [isSearch, setSearchStatus] = useState(props.search);
  const [categories, setCategories] = useState([]);
  const [isSort, setSortStatus] = useState(props.isSort);

  // Search;
  const handleKeyDown = (event) => {
    props.functioner(event.target.value);
  }
  const handleClick = () => {
    setInput(!input);
  }
  const terminateSearch = () => {
    setInput(!input);
    props.functioner("");
  }

  // Sort;
  const sort = () => {
    props.sort();
  }

  /**
   * Toggle between display and hide dropdown menu;
   */
  const [showClass, setShowClass] = useState("hd-menu");
  const showDropdownMenu = () => {
    if (showClass == "hd-menu") {
      setShowClass("dd-menu");
    } else {
      setShowClass("hd-menu");
    }
  }

  // get categories when page is loaded;
  const getCategories = async () => {
    const fetchCategories = "http://localhost:4000/api/categories";
    await axios
      .get(fetchCategories)
      .then((res) => {
        // console.log(res?.data)
        setCategories(res?.data.categories);
      })
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="toolbar">
      <Link to={props.url.add}>
        <div>
          <FontAwesomeIcon icon={faPlus} />
          <span> Thêm</span>
        </div>
      </Link>

      {/* dropdown menu */}
      <div style={{ position: "relative" }} onClick={showDropdownMenu}>
        <ul className='menu'>
          <li>
            <span style={{margin: "0"}}>
              <FontAwesomeIcon icon={faListDots} />
              <span> Loại sản phẩm</span>
            </span>
            <ul className={showClass}>
              {
                categories.length > 0 &&
                categories.map((category) => (
                  <Link to={`/manage/product/all/category/${category._id}`}>
                    <li value={category._id} key={category._id} >
                      {category.category_name}
                    </li>
                  </Link>
                ))
              }
              <li className='cls-dd-btn'>
                <span>
                  <FontAwesomeIcon icon={faClose} />
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {/* dropdown menu */}

      {/* Sort */}
      { isSort &&
      <div onClick={sort}>
        {
          props.sortType == 'sortaz' ?
            <>
              <FontAwesomeIcon icon={faSortAlphaDesc} />
              <span> Sắp xếp</span>
            </> :
            <>
              <FontAwesomeIcon icon={faSortAlphaAsc} />
              <span> Sắp xếp</span>
            </>
        }
      </div>
      }
      {/* Sort */}

      {/* Search */}
      {isSearch &&
        <div className='search'>
          {input &&
            <input defaultValue="" type='search' placeholder='Search' autoFocus className='inputsearch' onChange={handleKeyDown} />
          }
          {input
            ? <FontAwesomeIcon icon={faClose} className='sicon' onClick={terminateSearch} />
            : <FontAwesomeIcon icon={faSearch} className='sicon' onClick={handleClick} />
          }
        </div>
      }
      {/* Search */}
    </div>
  );
}

export default Toolbar