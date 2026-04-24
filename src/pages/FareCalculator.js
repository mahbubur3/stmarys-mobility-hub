import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

function FareCalculator() {
  const [distance, setDistance] = useState("");
  const [mode, setMode] = useState("bus");
  const [cost, setCost] = useState(null);

  const calculateCost = () => {
    let rate = 0;
    if (mode === "bus") rate = 1.7;
    if (mode === "rail") rate = 3.5;
    setCost(distance * rate);
  };

  return (
    <Container className="mt-4">
      <Card className="border-0">
        <h2 className="outfit-text fw-bold text-center">Fare Calculator</h2>
        <Form className="inter-text">
          <Form.Group className="mb-3">
            <Form.Label>Distance (km)</Form.Label>
            <Form.Control type="number" value={distance} onChange={(e) => setDistance(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Transport Mode</Form.Label>
            <Form.Select onChange={(e) => setMode(e.target.value)}>
              <option value="bus">Bus</option>
              <option value="rail">Train</option>
            </Form.Select>
          </Form.Group>
          <Button onClick={calculateCost}>Calculate</Button>
        </Form>

        {cost !== null && (<h4 className="mt-3">Estimated Cost: £{cost}</h4>)}
      </Card>
    </Container>
  );
}

export default FareCalculator;