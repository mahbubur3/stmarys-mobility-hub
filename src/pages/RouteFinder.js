import { useState } from "react";
import { Alert, Badge, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { getJourney, searchLocation } from "../services/api";

function RouteFinder() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startResults, setStartResults] = useState([]);
  const [endResults, setEndResults] = useState([]);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [journeys, setJourneys] = useState([]);
  const [loadingJourney, setLoadingJourney] = useState(false);
  const [error, setError] = useState("");

  const toJourneyPoint = (item) => ({
    id: item.id,
    name: item.name,
    lat: item.lat,
    lon: item.lon,
    journeyValue: `${item.lat},${item.lon}`,
  });

  const handleStartSearch = async (value) => {
    setStart(value);
    setSelectedStart(null);
    setJourneys([]);
    setError("");

    if (value.length > 2) {
      try {
        const results = await searchLocation(value);
        setStartResults(results);
      } catch (searchError) {
        console.error("Start search error:", searchError.response?.data || searchError.message);
        setStartResults([]);
        setError("Could not search for that start location. Please try again.");
      }
    } else {
      setStartResults([]);
    }
  };

  const handleEndSearch = async (value) => {
    setEnd(value);
    setSelectedEnd(null);
    setJourneys([]);
    setError("");

    if (value.length > 2) {
      try {
        const results = await searchLocation(value);
        setEndResults(results);
      } catch (searchError) {
        console.error("End search error:", searchError.response?.data || searchError.message);
        setEndResults([]);
        setError("Could not search for that destination. Please try again.");
      }
    } else {
      setEndResults([]);
    }
  };

  const planJourney = async () => {
    if (!selectedStart || !selectedEnd) {
      setError("Please choose both locations from the suggestions.");
      return;
    }

    setError("");
    setLoadingJourney(true);

    try {
      const data = await getJourney(
        selectedStart.journeyValue,
        selectedEnd.journeyValue,
        selectedStart.name,
        selectedEnd.name
      );
      setJourneys(data || []);
    } catch (error) {
      console.error("Journey API error:", error.response?.data || error.message);
      setJourneys([]);
      setError("Could not fetch that journey. Please choose both locations from the suggestions.");
    } finally {
      setLoadingJourney(false);
    }
  };

  const swapLocations = () => {
    setStart(end);
    setEnd(start);
    setSelectedStart(selectedEnd);
    setSelectedEnd(selectedStart);
    setStartResults([]);
    setEndResults([]);
    setJourneys([]);
    setError("");
  };

  return (
    <Container className="page-section route-page">
      <Card className="app-panel">
        <Card.Body>
        <div className="route-header">
          <div>
            <h2 className="outfit-text fw-bold mb-1">Plan a route</h2>
            <p className="text-muted mb-0">Search and select both places to see live TfL journey options.</p>
          </div>
          <Button variant="outline-primary" onClick={swapLocations} disabled={!start && !end}>Swap</Button>
        </div>

        {error && (
          <Alert variant="warning" className="mt-3 mb-3">
            {error}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">From</Form.Label>
        <Form.Control
          placeholder="Start location"
          value={start}
          onChange={(event) => handleStartSearch(event.target.value)}
        />
        <div className="suggestion-list">
          {startResults.map((item) => (
            <button
              type="button"
              key={item.id}
              className="suggestion-item"
              onClick={() => {
                setSelectedStart(toJourneyPoint(item));
                setStart(item.name);
                setStartResults([]);
              }}
            >
              <span>{item.name}</span>
              <small>{item.modes?.join(", ")}</small>
            </button>
          ))}
        </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">To</Form.Label>
        <Form.Control
          placeholder="End location"
          value={end}
          onChange={(event) => handleEndSearch(event.target.value)}
        />
        <div className="suggestion-list">
          {endResults.map((item) => (
            <button
              type="button"
              key={item.id}
              className="suggestion-item"
              onClick={() => {
                setSelectedEnd(toJourneyPoint(item));
                setEnd(item.name);
                setEndResults([]);
              }}
            >
              <span>{item.name}</span>
              <small>{item.modes?.join(", ")}</small>
            </button>
          ))}
        </div>
        </Form.Group>

        <Button
          className="w-100"
          onClick={planJourney}
          disabled={!selectedStart || !selectedEnd || loadingJourney}
        >
          {loadingJourney ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Finding route...
            </>
          ) : (
            "Plan Journey"
          )}
        </Button>

        <div className="route-results">
          {journeys.map((journey, journeyIndex) => (
            <Card key={journeyIndex} className="journey-card">
              <Card.Body>
                <div className="journey-summary">
                  <h3>{journey.duration} mins</h3>
                  <Badge bg={journey.alternativeRoute ? "secondary" : "success"}>
                    {journey.alternativeRoute ? "Alternative" : "Recommended"}
                  </Badge>
                </div>
                <div className="journey-legs">
                  {journey.legs.map((leg, legIndex) => (
                    <div key={legIndex} className="journey-leg">
                      <strong>{leg.mode.name}</strong>
                      <span>{leg.instruction.summary}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RouteFinder;
