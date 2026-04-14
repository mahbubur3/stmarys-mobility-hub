import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TravelOptions from "./pages/TravelOptions";
import FareCalculator from "./pages/FareCalculator";
import RouteFinder from "./pages/RouteFinder";
import LiveUpdates from "./pages/LiveUpdates";
import Dashboard from "./pages/Dashboard";

import "./styles/main.css"

function App() {
    return (
        <Router>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/options" element={<TravelOptions />} />
                <Route path="/fare" element={<FareCalculator />} />
                <Route path="/finder" element={<RouteFinder />} />
                <Route path="/updates" element={<LiveUpdates />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;