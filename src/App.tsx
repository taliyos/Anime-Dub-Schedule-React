import { Route, Routes } from "react-router-dom";

import { IndexPage } from "./pages/IndexPage/IndexPage";
import "../src/style/main.sass";

function App() {
    return (
        <div className = "App">
            <Routes>
                <Route index element = { <IndexPage/> } />
            </Routes>
        </div>
    )
}


export default App;