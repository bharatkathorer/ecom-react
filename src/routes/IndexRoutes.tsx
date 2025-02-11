import {Route, Routes} from "react-router-dom";
import WelcomePage from "../pages/WelcomePage.tsx";
import LoginPage from "../pages/frontend/auth/LoginPage.tsx";
import RegisterPage from "../pages/frontend/auth/RegisterPage.tsx";
import PrivateRoute from "./forntend/PrivateRoute.tsx";
import AdminPrivateRoute from "./backend/PrivateRoute.tsx";
import CartPage from "../pages/frontend/cart/CartPage.tsx";
import OrdersPage from "../pages/frontend/orders/OrdersPage.tsx";
import AdminOrdersPage from "../pages/backend/orders/OrderPage.tsx"
import NotFound from "../pages/errors/NotFound.tsx";

import AdminLoginPage from "../pages/backend/auth/LoginPage.tsx";
import DashboardPage from "../pages/backend/DashboardPage.tsx";
import GuestRoute from "./forntend/GuestRoute.tsx";
import AdminGuestRoute from "./backend/GuestRoute.tsx";
import ProductPage from "../pages/backend/products/ProductPage.tsx";
import UserPage from "../pages/backend/users/UserPage.tsx";
import CreateProductPage from "../pages/backend/products/CreateProductPage.tsx";
import ViewOrderPage from "../pages/backend/orders/ViewOrderPage.tsx";
import ViewProduct from "../pages/frontend/products/ViewProduct.tsx";
import ViewOrder from "../pages/frontend/orders/ViewOrder.tsx";

const IndexRoutes = () => {
    return (<>
        <Routes>

            {/* Public Routes */}
            <Route path="/" element={<WelcomePage/>}/>
            <Route path="/:productId/product" element={<ViewProduct/>}/>

            <Route element={<GuestRoute/>}>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Route>

            <Route element={<AdminGuestRoute/>}>
                <Route path="/admin/login" element={<AdminLoginPage/>}/>
            </Route>
            {/* Private Routes */}
            <Route element={<PrivateRoute/>}>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/orders" element={<OrdersPage/>}/>
                <Route path="/orders/:orderId" element={<ViewOrder/>}/>
            </Route>

            {/* Private Routes */}
            <Route element={<AdminPrivateRoute/>}>
                <Route path="/admin" element={<DashboardPage/>}/>

                <Route path="/admin/products" element={<ProductPage/>}/>
                <Route path="/admin/products/create" element={<CreateProductPage/>}/>
                <Route path="/admin/products/:productId" element={<CreateProductPage/>}/>

                <Route path="/admin/orders" element={<AdminOrdersPage/>}/>
                <Route path="/admin/orders/:orderId" element={<ViewOrderPage/>}/>
                <Route path="/admin/users" element={<UserPage/>}/>
            </Route>

            {/* Catch-All for Not Found */}
            <Route path="*" element={<NotFound/>}/>

            {/*<Route path={'/*'} element={<FrontEndRoutes/>}/>*/}
            {/*<Route path={'/admin/*'} element={<BackendRoutes/>}/>*/}
        </Routes>
    </>);
}

export default IndexRoutes;
