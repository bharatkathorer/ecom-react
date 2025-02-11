import {Route, Routes} from "react-router-dom";
import LoginPage from "../../pages/frontend/auth/LoginPage.tsx";
import RegisterPage from "../../pages/frontend/auth/RegisterPage.tsx";
import CartPage from "../../pages/frontend/cart/CartPage.tsx";
import OrdersPage from "../../pages/frontend/orders/OrdersPage.tsx";
import NotFound from "../../pages/errors/NotFound.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import WelcomePage from "../../pages/WelcomePage.tsx";

const FrontEndRoutes = () => {
    return (<>
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<WelcomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>

            {/* Private Routes */}
            <Route element={<PrivateRoute/>}>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/orders" element={<OrdersPage/>}/>
            </Route>

            {/* Catch-All for Not Found */}
            <Route path="*" element={<NotFound/>}/>

        </Routes>
    </>);
}

export default FrontEndRoutes;
