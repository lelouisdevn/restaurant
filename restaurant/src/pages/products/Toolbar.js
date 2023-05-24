import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { faSortAlphaAsc } from "@fortawesome/free-solid-svg-icons";

const Toolbar = () => {
  return (
    <div className="toolbar">
      {/* <FontAwesomeIcon icon={'face-smile-plus'}/> */}
      <div>
        <FontAwesomeIcon icon={faPlus} />
        <span> Add</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faEdit} />
        <span> Edit</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faRemove} />
        <span> Remove a product</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faSortAlphaAsc} />
        <span> Sort: A-Z</span>
      </div>
    </div>
  );
}

export default Toolbar