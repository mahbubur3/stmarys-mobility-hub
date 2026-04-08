import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TravelOptions from "./pages/TravelOptions";

function App() {
    return (
        <Router>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/options" element={<TravelOptions />} />
            </Routes>
        </Router>
    );
}

export default App;