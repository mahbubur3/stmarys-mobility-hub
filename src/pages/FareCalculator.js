import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const fareRules = {
  bus: {
    label: "Bus",
    helper: "Useful for low-cost journeys where traffic may affect time.",
    estimate: (distance) => {
      const journeys = Math.max(1, Math.ceil(distance / 8));
      return { min: journeys * 1.75, max: journeys * 1.75 };
    },
  },
  rail: {
    label: "Rail or Tube",
    helper: "Best for longer cross-city trips, with higher peak-time costs.",
    estimate: (distance) => ({ min: 2.8 + distance * 0.22, max: 4.9 + distance * 0.42 }),
  },
  cycling: {
    label: "Cycling",
    helper: "Free with your own bike; bike hire can add a small access cost.",
    estimate: () => ({ min: 0, max: 3.3 }),
  },
  walking: {
    label: "Walking",
    helper: "No fare cost, but best for short journeys or first/last-mile travel.",
    estimate: () => ({ min: 0, max: 0 }),
  },
};

function FareCalculator() {
  const [distance, setDistance] = useState("");
  const [mode, setMode] = useState("bus");
  const [costRange, setCostRange] = useState(null);
  const [error, setError] = useState("");

  const calculateCost = () => {
    const distanceValue = Number(distance);

    if (!distance || distanceValue <= 0) {
      setCostRange(null);
      setError("Enter a distance greater than 0 km.");
      return;
    }

    setError("");
    setCostRange(fareRules[mode].estimate(distanceValue));
  };

  const formattedCost = costRange
    ? costRange.min === costRange.max
      ? `\u00a3${costRange.min.toFixed(2)}`
      : `\u00a3${costRange.min.toFixed(2)} - \u00a3${costRange.max.toFixed(2)}`
    : "";

  return (
    <Container className="page-section fare-page">
      <div className="page-heading compact-heading">
        <h2 className="outfit-text fw-bold mb-2">Cost Estimator</h2>
        <p className="text-muted mb-0">
          Compare likely costs for bus, rail, cycling, and walking before choosing a route.
        </p>
      </div>
      <Card className="app-panel fare-calculator">
        <Card.Body>
        {error && <Alert variant="warning">{error}</Alert>}
          <Form className="inter-text">
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Distance (km)</Form.Label>
                  <Form.Control
                    min="0"
                    step="0.1"
                    type="number"
                    value={distance}
                    onChange={(event) => setDistance(event.target.value)}
                    placeholder="For example, 4.5"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Travel mode</Form.Label>
                  <Form.Select
                    value={mode}
                    onChange={(event) => {
                      setMode(event.target.value);
                      setCostRange(null);
                    }}>
                    {Object.entries(fareRules).map(([key, rule]) => (
                      <option key={key} value={key}>
                        {rule.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <p className="mode-helper">{fareRules[mode].helper}</p>
            <Button onClick={calculateCost}>Calculate</Button>
          </Form>
          {costRange !== null && (
            <div className="fare-result">
              <span>Estimated cost range</span>
              <strong>{formattedCost}</strong>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FareCalculator;
