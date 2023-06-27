import { Navigate,useNavigate } from "react-router-dom";

const ProtectedCashier = ({isAllowed, redirectPath,children}) =>{
    console.log(window.location.pathname);
    const navigate = useNavigate();
    if(isAllowed.role !== "4"){
        localStorage.setItem('currentUrl', window.location.pathname);
        return <Navigate to={redirectPath}></Navigate>;
    }else return children;
}
export default ProtectedCashier;