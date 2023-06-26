import { Link, Navigate, useNavigate} from "react-router-dom";
import React from "react";
const ProtectedOrder = ({isAllowed, redirectPath,children}) =>{

    //console.log(window.location.pathname);
    
        if(isAllowed.role !== "2"){
            return <Navigate to={redirectPath}></Navigate>;
        } else {
            return children;
        }
}

export default ProtectedOrder;