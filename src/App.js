import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TravelOptions from "./pages/TravelOptions";
import FareCalculator from "./pages/FareCalculator";

import "./styles/main.css"

function App() {
    return (
        <Router>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/options" element={<TravelOptions />} />
                <Route path="/fare" element={<FareCalculator />} />
            </Routes>
        </Router>
    );
}

export default App;