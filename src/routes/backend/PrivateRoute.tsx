import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = () => {
    const {login} = useSelector((state: any) => state.adminAuth);
    return login ? <Outlet/> : <Navigate to="/admin/login" replace/>;
};

export default PrivateRoute;
