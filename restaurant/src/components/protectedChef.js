import { Navigate,useNavigate } from "react-router-dom";

const ProtectedChef = ({isAllowed, redirectPath,children}) =>{
    console.log(window.location.pathname);
    const navigate = useNavigate();
    if(isAllowed.role !== "3"){
        return <Navigate to={redirectPath}></Navigate>;
    }else return children;
}
export default ProtectedChef;