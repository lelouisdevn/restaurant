import { Link, Navigate } from "react-router-dom";
const ProtectedManage = ({isAllowed, redirectPath,children}) =>{
    if(isAllowed){
        //console.log(isAllowed);
        if(isAllowed.role == "1"){
            return children;
        }else 
            if(( isAllowed.role == "3") || ( isAllowed.role == "4")){
                if(isAllowed.role == "3"){
                    return  <Navigate to="/manage/chef"></Navigate>;
                }else if(isAllowed.role == "4"){
                    return  <Navigate to="/manage/user"></Navigate>;
                }else return  <Navigate to={redirectPath}></Navigate>;
            }else return  <Navigate to={redirectPath}></Navigate>; 

    }else {
        return <Navigate to={redirectPath}></Navigate>;
    }
    
}
export default ProtectedManage;