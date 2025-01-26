import {Route, Routes} from "react-router-dom";
import LoginPage from "../../pages/frontend/auth/LoginPage.tsx";
import RegisterPage from "../../pages/frontend/auth/RegisterPage.tsx";

const AuthRoutes = () => {
    return (<>
        <Routes>
            <Route  path="login" id={'login'}
                   element={<LoginPage/>}
            />
            <Route  path="register" id={'register'}
                   element={<RegisterPage/>}
            />
        </Routes>
    </>);
}

export default AuthRoutes;