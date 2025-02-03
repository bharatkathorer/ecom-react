import {Route, Routes} from "react-router-dom";
import LoginPage from "../../pages/frontend/auth/LoginPage.tsx";
import RegisterPage from "../../pages/frontend/auth/RegisterPage.tsx";
import {useSelector} from "react-redux";
import CartPage from "../../pages/frontend/cart/CartPage.tsx";
import OrdersPage from "../../pages/frontend/orders/OrdersPage.tsx";

const AuthRoutes = () => {
    const {login} = useSelector((state: any) => state.auth);
    return (<>
        <Routes>
            {login ? <>
                <Route path="/cart" id="cart" element={<CartPage/>}/>
                <Route path="/orders" id="orders" element={<OrdersPage/>}/>
            </> : <>
                <Route path="login" id={'login'}
                       element={<LoginPage/>}
                />
                <Route path="register" id={'register'}
                       element={<RegisterPage/>}
                />
            </>}
        </Routes>
    </>);
}

export default AuthRoutes;
