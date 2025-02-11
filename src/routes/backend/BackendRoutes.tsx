import {Route, Routes} from "react-router-dom";
import LoginPage from "../../pages/backend/auth/LoginPage.tsx";
import RegisterPage from "../../pages/backend/auth/RegisterPage.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import DashboardPage from "../../pages/backend/DashboardPage.tsx";
import NotFound from "../../pages/errors/NotFound.tsx";


const FrontEndRoutes = () => {
    return (<>
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>

            {/* Private Routes */}
            <Route element={<PrivateRoute/>}>
                <Route path="/" element={<DashboardPage/>}/>
            </Route>

            {/* Catch-All for Not Found */}
            <Route path="*" element={<NotFound/>}/>

        </Routes>
    </>);
}

export default FrontEndRoutes;
