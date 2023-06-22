import { Navigate } from "react-router-dom";

const ProtectedRestSelect = ({isAllowed, redirectPath,children}) =>{
    // if(isAllowed){
    //     console.log(isAllowed);
    //     if(isAllowed.role != "1"){
    //         //localStorage.clear();
    //         return  <Navigate to={redirectPath}></Navigate>;
    //     }
    //     return children;
    // }else {
    //     return <Navigate to={redirectPath}></Navigate>;
    // }
    // if(isAllowed){
    //     //console.log(isAllowed);
    //     if((isAllowed.role != "1" && isAllowed.role == "3") || (isAllowed.role != "1" && isAllowed.role == "4")){
    //         if(isAllowed.role === "3"){
    //             return  <Navigate to="manage/info"></Navigate>;
    //         }else if(isAllowed.role === "4"){
    //             return  <Navigate to="manage/user"></Navigate>;
    //         }else if(isAllowed.role === "1"){
    //             return children;
    //         }else return  <Navigate to={redirectPath}></Navigate>;
    //     }else return children;
        
    // }else {
    //     return <Navigate to={redirectPath}></Navigate>;
    // }
}
export default ProtectedRestSelect;