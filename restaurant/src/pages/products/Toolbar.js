import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { faSortAlphaAsc } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Toolbar = (props) => {
  const [input, setInput] = useState(false);
  return (
    <div className="toolbar">
      {/* <FontAwesomeIcon icon={'face-smile-plus'}/> */}
      <Link to={props.url}>
      <div>
        <FontAwesomeIcon icon={faPlus} />
        <span> Thêm</span>
      </div>
      </Link>
      <div>
        <FontAwesomeIcon icon={faEdit} />
        <span> Sửa</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faRemove} />
        <span> Xóa sản phẩm</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faSortAlphaAsc} />
        <span> Sắp xếp</span>
      </div>
      <div className='search'>
        { input &&
          <input defaultValue="" placeholder='Search' autoFocus  className='inputsearch' />
        }
        { input 
        ? <FontAwesomeIcon icon={faClose} onClick={() => setInput(!input)} />
        : <FontAwesomeIcon icon={faSearch} onClick={() => setInput(!input)} />
        }
      </div>
    </div>
  );
}

export default Toolbar