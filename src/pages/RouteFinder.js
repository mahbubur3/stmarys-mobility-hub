import { useState } from "react";
import { searchLocation } from "../services/api";

function RouteFinder() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [results, setResults] = useState([]);

  const planJourney = async () => {
    try {
      const startResults = await searchLocation(start);
      const endResults = await searchLocation(end);

      setResults([
        `Start: ${startResults[0]?.name}`,
        `End: ${endResults[0]?.name}`,
        "Suggested Route: Tube → Walk → Bus",
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Journey Planner</h1>

      <input
        type="text"
        placeholder="Start location"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <input
        type="text"
        placeholder="End location"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <button onClick={planJourney}>Plan Journey</button>

      {results.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}

export default RouteFinder;