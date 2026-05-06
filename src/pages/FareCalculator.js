import { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

function FareCalculator() {
  const [distance, setDistance] = useState("");
  const [mode, setMode] = useState("bus");
  const [cost, setCost] = useState(null);
  const [error, setError] = useState("");

  const calculateCost = () => {
    const distanceValue = Number(distance);

    if (!distance || distanceValue <= 0) {
      setCost(null);
      setError("Enter a distance greater than 0 km.");
      return;
    }

    let rate = 0;
    if (mode === "bus") rate = 1.7;
    if (mode === "rail") rate = 3.5;

    setError("");
    setCost(distanceValue * rate);
  };

  return (
    <Container className="page-section">
      <Card className="app-panel">
        <Card.Body>
          <h2 className="outfit-text fw-bold text-center mb-3">Fare Calculator</h2>
          {error && <Alert variant="warning">{error}</Alert>}

          <Form className="inter-text">
            <Form.Group className="mb-3">
              <Form.Label>Distance (km)</Form.Label>
              <Form.Control
                min="0"
                step="0.1"
                type="number"
                value={distance}
                onChange={(event) => setDistance(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Transport Mode</Form.Label>
              <Form.Select value={mode} onChange={(event) => setMode(event.target.value)}>
                <option value="bus">Bus</option>
                <option value="rail">Train</option>
              </Form.Select>
            </Form.Group>

            <Button onClick={calculateCost}>Calculate</Button>
          </Form>

          {cost !== null && (
            <h4 className="mt-3">Estimated Cost: &pound;{cost.toFixed(2)}</h4>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FareCalculator;
