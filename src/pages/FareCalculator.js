import { useState } from "react";

function FareCalculator() {
    const [distance, setDistance] = useState("");
    const [mode, setMode] = useState("bus");
    const [cost, setCost] = useState(null);

    const calculateCost = () => {
        let rate = 0;

        if (mode === "bus") rate = 1.5;
        if (mode === "rail") rate = 2.5;
        if (mode === "cycling") rate = 0;
        if (mode === "walking") rate = 0;

        setCost(distance * rate);
    };

    return (
        <div>
            <h1>Fare Calculator</h1>

            <input type="number" placeholder="Enter distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} />

            <select onChange={(e) => setMode(e.target.value)}>
                <option value="bus">Bus</option>
                <option value="rail">Rail</option>
                <option value="cycling">Cycling</option>
                <option value="walking">Walking</option>
            </select>

            <button onClick={calculateCost}>Calculate</button>

            {cost !== null && <h2>Estimated Cost: £{cost}</h2>}
        </div>
    );
}

export default FareCalculator;