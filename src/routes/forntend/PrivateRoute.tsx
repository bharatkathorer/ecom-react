import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = () => {
    const {login} = useSelector((state: any) => state.auth);
    return login ? <Outlet/> : <Navigate to="/login" replace/>;
};

export default PrivateRoute;
