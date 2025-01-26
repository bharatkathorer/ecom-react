import {Route, Routes} from "react-router-dom";
import AuthRoutes from "./forntend/AuthRoutes.tsx";

const IndexRoutes = () => {
    return (<>
        <Routes>
            <Route path={'/*'} element={<AuthRoutes/>}/>
        </Routes>
    </>);
}

export default IndexRoutes;