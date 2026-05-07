import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="home-hero">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1 className="display-4 fw-bold outfit-text">Smart Travel Across London</h1>
              <p className="lead mt-3 inter-text">
                Plan everyday journeys, compare travel modes, estimate costs, and check live transport information in one clear place.
              </p>
              <div className="mt-4 d-flex flex-wrap justify-content-center gap-2">
                <Button as={Link} to="/finder">Plan Journey</Button>
                <Button as={Link} to="/nearby" variant="outline-primary">Find Nearby Stops</Button>
                <Button as={Link} to="/updates" variant="outline-dark">Live Updates</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="page-section">
        <Row className="inter-text">
          <Col lg={3} md={6} className="mb-4">
            <Card className="h-100 app-panel text-center">
              <Card.Body>
                <h6 className="fw-bold">Route Finder</h6>
                <p>Find journey options between two selected London locations.</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <Card className="h-100 app-panel text-center">
              <Card.Body>
                <h6 className="fw-bold">Fare Calculator</h6>
                <p>Estimate travel cost before you set off.</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <Card className="h-100 app-panel text-center">
              <Card.Body>
                <h6 className="fw-bold">Nearby Stops</h6>
                <p>Find nearby transport stops and shared cycle availability.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="h-100 app-panel text-center">
              <Card.Body>
                <h6 className="fw-bold">Live Updates</h6>
                <p>Check current service status for London transport lines.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
