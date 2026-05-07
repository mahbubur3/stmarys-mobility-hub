import { useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { getNearbyBikePoints, getNearbyStops, searchLocation } from "../services/api";

function NearbyTravel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [stops, setStops] = useState([]);
  const [bikePoints, setBikePoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usingLocation, setUsingLocation] = useState(false);
  const [error, setError] = useState("");

  const bikeValue = (bikePoint, key) =>
    bikePoint.additionalProperties?.find((item) => item.key === key)?.value || "0";

  const modeLabel = (stop) => {
    const modes = stop.modes || [];
    if (!modes.length) return "Stop";
    return modes.map((mode) => mode.replace("-", " ")).join(", ");
  };

  const loadNearbyTravel = async (place) => {
    setLoading(true);
    setError("");
    setStops([]);
    setBikePoints([]);
    try {
      const [nearbyStops, nearbyBikes] = await Promise.all([
        getNearbyStops(place.lat, place.lon),
        getNearbyBikePoints(place.lat, place.lon),
      ]);

      setStops(nearbyStops.slice(0, 8));
      setBikePoints(nearbyBikes.slice(0, 8));
    } catch (nearbyError) {
      console.error("Nearby travel error:", nearbyError.response?.data || nearbyError.message);
      setError("Could not load nearby stops and bike availability. Please try another place.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    setQuery(value);
    setSelectedPlace(null);
    setStops([]);
    setBikePoints([]);
    setError("");

    if (value.length <= 2) {
      setResults([]);
      return;
    }
    try {
      const matches = await searchLocation(value);
      setResults(matches);
    } catch (searchError) {
      console.error("Nearby search error:", searchError.response?.data || searchError.message);
      setResults([]);
      setError("Could not search for that place. Please check the spelling and try again.");
    }
  };

  const selectPlace = (place) => {
    const nextPlace = {
      id: place.id,
      name: place.name,
      lat: place.lat,
      lon: place.lon,
    };
    setSelectedPlace(nextPlace);
    setQuery(place.name);
    setResults([]);
    loadNearbyTravel(nextPlace);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support current location.");
      return;
    }
    setUsingLocation(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentPlace = {
          id: "current-location",
          name: "Your current location",
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        setSelectedPlace(currentPlace);
        setQuery(currentPlace.name);
        setResults([]);
        setUsingLocation(false);
        loadNearbyTravel(currentPlace);
      },
      () => {
        setUsingLocation(false);
        setError("Location permission was not available. Search for a place instead.");
      }
    );
  };

  return (
    <Container className="page-section nearby-page">
      <div className="page-heading">
        <h2 className="outfit-text fw-bold mb-2">Nearby Stops and Bikes</h2>
        <p className="text-muted mb-0">
          Search a place or use your current location to compare nearby public transport and Santander Cycles.
        </p>
      </div>
      <Card className="app-panel search-panel">
        <Card.Body>
          {error && <Alert variant="warning">{error}</Alert>}
          <Row className="g-3 align-items-end">
            <Col lg={8}>
              <Form.Group>
                <Form.Label className="fw-semibold">Place or station</Form.Label>
                <Form.Control
                  value={query}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Try St Marys, Paddington, Bank, Stratford..."
                />
              </Form.Group>
              <div className="suggestion-list">
                {results.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className="suggestion-item"
                    onClick={() => selectPlace(item)}>
                    <span>{item.name}</span>
                    <small>{item.modes?.join(", ") || "London transport place"}</small>
                  </button>
                ))}
              </div>
            </Col>
            <Col lg={4}>
              <Button
                variant="outline-primary"
                className="w-100"
                onClick={useCurrentLocation}
                disabled={usingLocation}>
                {usingLocation ? "Finding location..." : "Use Current Location"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {selectedPlace && (
        <div className="selected-place">
          Showing results near <strong>{selectedPlace.name}</strong>
        </div>
      )}

      {loading && (
        <div className="text-center page-section">
          <Spinner animation="border" />
          <p className="mt-2 mb-0">Loading nearby travel options...</p>
        </div>
      )}

      {!loading && selectedPlace && (
        <Row className="g-4">
          <Col lg={6}>
            <h3 className="result-heading">Closest Stops</h3>
            <div className="result-stack">
              {stops.length === 0 && (
                <Card className="empty-state">
                  <Card.Body>No nearby stops were returned for this location.</Card.Body>
                </Card>
              )}
              {stops.map((stop) => (
                <Card key={stop.naptanId || stop.id} className="result-card">
                  <Card.Body>
                    <div className="result-title-row">
                      <h4>{stop.commonName}</h4>
                      <Badge bg="primary">{Math.round(stop.distance || 0)} m</Badge>
                    </div>
                    <p className="mb-0 text-muted text-capitalize">{modeLabel(stop)}</p>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>

          <Col lg={6}>
            <h3 className="result-heading">Bike Hire Availability</h3>
            <div className="result-stack">
              {bikePoints.length === 0 && (
                <Card className="empty-state">
                  <Card.Body>No nearby bike hire docks were returned for this location.</Card.Body>
                </Card>
              )}
              {bikePoints.map((bikePoint) => (
                <Card key={bikePoint.id} className="result-card">
                  <Card.Body>
                    <div className="result-title-row">
                      <h4>{bikePoint.commonName}</h4>
                      <Badge bg="success">{Math.round(bikePoint.distance || 0)} m</Badge>
                    </div>
                    <div className="capacity-grid">
                      <span>
                        <strong>{bikeValue(bikePoint, "NbBikes")}</strong>
                        Bikes
                      </span>
                      <span>
                        <strong>{bikeValue(bikePoint, "NbEmptyDocks")}</strong>
                        Spaces
                      </span>
                      <span>
                        <strong>{bikeValue(bikePoint, "NbDocks")}</strong>
                        Docks
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default NearbyTravel;
