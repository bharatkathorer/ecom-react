import IndexRoutes from "./routes/IndexRoutes.tsx";
import {Route, Routes} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage.tsx";
import {useSelector} from "react-redux";
import ChatContainer from "./components/chat/ChatContainer.tsx";
import {Bounce, ToastContainer} from "react-toastify";

function App() {
    const login = useSelector((state: any) => state.auth.login);
    const isAdmin = window.location.pathname.includes('admin');

    return (
        <>
            <ToastContainer position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                            transition={Bounce}/>
            {
                (login && !isAdmin) &&
                <ChatContainer/>
            }
            <Routes>
                <Route index path="/"
                       element={<WelcomePage/>}
                />
                <Route path="/*" element={<IndexRoutes/>}/>
            </Routes>

        </>
    )
}

export default App
