import { useState } from "react";

function Dashboard() {
  const [journey, setJourney] = useState("");
  const [saved, setSaved] = useState([]);

  const saveJourney = () => {
    setSaved([...saved, journey]);
    setJourney("");
  };

  return (
    <div>
      <h1>Your Dashboard</h1>

      <input
        type="text"
        placeholder="Enter your journey"
        value={journey}
        onChange={(e) => setJourney(e.target.value)}
      />

      <button onClick={saveJourney}>Save</button>

      <h3>Saved Journeys:</h3>
      <ul>
        {saved.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;