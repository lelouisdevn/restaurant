import { Link, Navigate } from "react-router-dom";
import React from "react";

// const ProtectedManage = ({isAllowed, redirectPath,children}) =>{

//     console.log(window.location.pathname);

//     if(isAllowed){
//         //console.log(isAllowed);
//         if(isAllowed.role == "1"){
//             return children;
//         }else 
//             if(( isAllowed.role == "3") || ( isAllowed.role == "4")){
//                 if(isAllowed.role == "3"){
//                     if(window.location.pathname !== "/manage/chef" ){
//                         return  <Link to="/manage/chef"></Link>;
//                     }
//                 }else if(isAllowed.role == "4"){
//                     return  <Navigate to="/manage/orders"></Navigate>;
//                 }else return  <Navigate to={redirectPath}></Navigate>;
//             }else return  <Navigate to={redirectPath}></Navigate>; 

//     }else {
//         return <Navigate to={redirectPath}></Navigate>;
//     }

// }

const ProtectedManage = ({ isAllowed, redirectPath, children }) => {

    if (isAllowed) {
        //console.log(isAllowed);
        if (isAllowed.role === "1") {
            return children;
        } else

            if (isAllowed.role === "3") {
                if (window.location.pathname !== "/manage/chef") {
                    window.location.href = "/manage/chef";
                    return <Link to="/manage/chef"></Link>;
                }
            }
        if (isAllowed.role === "4") {
            return <Navigate to="/manage/orders"></Navigate>;
        }
        return <Navigate to={redirectPath}></Navigate>;


    } else {
        return <Navigate to={redirectPath}></Navigate>;
    }

}
export default ProtectedManage;