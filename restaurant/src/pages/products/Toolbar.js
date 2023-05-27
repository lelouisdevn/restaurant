import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { faSortAlphaAsc } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const Toolbar = (props) => {
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
    </div>
  );
}

export default Toolbar