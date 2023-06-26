import { Link, Navigate, useNavigate} from "react-router-dom";
import React from "react";
import LayoutChef from '../pages/chef/LayoutChef';
const ProtectedManage = ({isAllowed, redirectPath,children}) =>{

    //console.log(window.location.pathname);
    
    if(isAllowed.role !== "1"){
        return <Navigate to={redirectPath}></Navigate>;
    } else {
        return children;
    }
}

export default ProtectedManage;