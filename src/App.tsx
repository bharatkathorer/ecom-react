import IndexRoutes from "./routes/IndexRoutes.tsx";
import {Route, Routes} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage.tsx";

function App() {
    return (
        <>
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
