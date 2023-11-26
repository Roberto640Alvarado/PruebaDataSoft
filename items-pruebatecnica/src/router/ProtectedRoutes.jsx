import { Navigate,Outlet } from "react-router-dom";
import context from "../Context/UserContext";
const ProtectedRoutes = () => {

    let isLogged = context.isUserLogged();

    if(!isLogged){
        return <Navigate to="/"/>
    }
    return (
        <Outlet/>
    )
}

export default ProtectedRoutes;