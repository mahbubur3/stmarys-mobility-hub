import { useEffect, useState } from "react";
import { Alert, Badge, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { getLineStatus } from "../services/api";

function LiveUpdates() {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLineStatus()
      .then((data) => {
        setLines(data);
        setError("");
      })
      .catch((statusError) => {
        console.error("Line status error:", statusError.response?.data || statusError.message);
        setError("Live transport updates are not available right now. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container className="page-section text-center">
        <Spinner animation="border" />
        <p className="mt-2 mb-0">Loading live updates...</p>
      </Container>
    );
  }

  return (
    <Container className="page-section">
      <h2 className="mb-4 outfit-text fw-bold text-center">Live Transport Updates</h2>
      {error && <Alert variant="warning">{error}</Alert>}

      <Row>
        {lines.map((line) => (
          <Col key={line.id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="h-100 app-panel">
              <Card.Body>
                <h5 className="fw-bold">{line.name}</h5>
                {line.lineStatuses.map((status, index) => {
                  const isGoodService = status.statusSeverityDescription === "Good Service";

                  return (
                    <div key={index} className="d-flex justify-content-between gap-2">
                      <span>Status</span>
                      <Badge bg={isGoodService ? "success" : "danger"}>
                        {status.statusSeverityDescription}
                      </Badge>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default LiveUpdates;
