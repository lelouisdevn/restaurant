import React, { useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import './bep.css';
import DS_Detail from './ds_detail';

const Modal = ({ isShowing, hide, order, key  }) => isShowing ? ReactDOM.createPortal(
    
    <React.Fragment>
        <div className="modal-overlay " />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal p-5 m-5">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">X</span>
                    </button>
                </div>
                <div>
                    
                    <DS_Detail key={key} order={order}/>
                    {console.log(key)}
                </div>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;
