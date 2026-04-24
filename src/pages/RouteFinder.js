// import { useState } from "react";
// import { searchLocation } from "../services/api";

// function RouteFinder() {
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [results, setResults] = useState([]);

//   const planJourney = async () => {
//     try {
//       const startResults = await searchLocation(start);
//       const endResults = await searchLocation(end);

//       setResults([
//         `Start: ${startResults[0]?.name}`,
//         `End: ${endResults[0]?.name}`,
//         "Suggested Route: Tube → Walk → Bus",
//       ]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Journey Planner</h1>

//       <input
//         type="text"
//         placeholder="Start location"
//         value={start}
//         onChange={(e) => setStart(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="End location"
//         value={end}
//         onChange={(e) => setEnd(e.target.value)}
//       />

//       <button onClick={planJourney}>Plan Journey</button>

//       {results.map((item, index) => (
//         <p key={index}>{item}</p>
//       ))}
//     </div>
//   );
// }

// export default RouteFinder;




// import { useState } from "react";
// import { Container, Form, Button, Card } from "react-bootstrap";

// function RouteFinder() {
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [results, setResults] = useState([]);

//   const planJourney = () => {
//     setResults([
//       `Start: ${start}`,
//       `End: ${end}`,
//       "Route: Tube → Walk → Bus",
//     ]);
//   };

//   return (
//     <Container className="mt-4">
//       <Card className="p-4 shadow">
//         <h2>Journey Planner</h2>

//         <Form>
//           <Form.Control
//             className="mb-3"
//             placeholder="Start location"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//           />

//           <Form.Control
//             className="mb-3"
//             placeholder="End location"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//           />

//           <Button onClick={planJourney}>Plan Journey</Button>
//         </Form>

//         <div className="mt-3">
//           {results.map((item, i) => (
//             <p key={i}>{item}</p>
//           ))}
//         </div>
//       </Card>
//     </Container>
//   );
// }

// export default RouteFinder;



import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { searchLocation, getJourney } from "../services/api";

function RouteFinder() {
const [start, setStart] = useState("");
const [end, setEnd] = useState("");

const [startResults, setStartResults] = useState([]);
const [endResults, setEndResults] = useState([]);

const [selectedStart, setSelectedStart] = useState(null);
const [selectedEnd, setSelectedEnd] = useState(null);

const [journeys, setJourneys] = useState([]);

const handleStartSearch = async (value) => {
  setStart(value);
  if (value.length > 2) {
    const results = await searchLocation(value);
    setStartResults(results);
  }
};

const handleEndSearch = async (value) => {
  setEnd(value);
  if (value.length > 2) {
    const results = await searchLocation(value);
    setEndResults(results);
  }
};

const planJourney = async () => {
  // console.log("FROM:", selectedStart);
  // console.log("TO:", selectedEnd);

  if (!selectedStart || !selectedEnd) {
    alert("Please select valid locations");
    return;
  }

  try {
    const data = await getJourney(selectedStart.id, selectedEnd.id);
    setJourneys(data);
  } catch (error) {
    alert("Failed to fetch");
  }
};

  return (
    <Container className="mt-4">
      <Card className="border-0">
        <h2 className="outfit-text fw-bold text-center">Journey Planner</h2>
        <Form.Control placeholder="Start location" value={start} onChange={(e) => handleStartSearch(e.target.value)}/>
        <div className="border mb-2">
          {startResults.map((item) => (
            <div key={item.id} style={{ cursor: "pointer", padding: "5px" }} onClick={() => {
                // setSelectedStart(item);
                setSelectedStart({
                  id: item.naptanId || item.id,
                  name: item.name
                });
                setStart(item.name);
                setStartResults([]);
              }}>
              {item.name}
            </div>
          ))}
        </div>
        <Form.Control placeholder="End location" value={end} onChange={(e) => handleEndSearch(e.target.value)}/>

        <div className="border mb-2">
          {endResults.map((item) => (
            <div key={item.id} style={{ cursor: "pointer", padding: "5px" }} onClick={() => {
                // setSelectedEnd(item);
                setSelectedEnd({
                  id: item.naptanId || item.id,
                  name: item.name
                });
                setEnd(item.name);
                setEndResults([]);
              }}>
              {item.name}
            </div>
          ))}
        </div>
        
        <div className="mt-3">
          {journeys.map((journey, i) => (
            <div key={i} className="mb-3 p-2 border">
              <p><strong>Duration:</strong> {journey.duration} mins</p>
              {journey.legs.map((leg, index) => (
                <p key={index}>{leg.mode.name.toUpperCase()} → {leg.instruction.summary}</p>
              ))}
            </div>
          ))}
        </div>
        <Button className="mt-3" onClick={planJourney} disabled={!selectedStart || !selectedEnd}>Plan Journey</Button>
      </Card>
    </Container>
  );
}

export default RouteFinder;