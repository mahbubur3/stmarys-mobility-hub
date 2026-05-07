import options from "../data/options";
import { Container, Row, Col, Card } from "react-bootstrap";

function TravelOptions() {
  return (
    <Container className="page-section">
      <div className="page-heading">
        <h2 className="outfit-text fw-bold mb-2">Travel Options</h2>
        <p className="text-muted mb-0">
          A quick comparison of common urban travel choices, including benefits and limitations.
        </p>
      </div>
      <Row>
        {options.map((option, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-4 inter-text">
            <Card className="h-100 app-panel">
              <Card.Body>
                <Card.Title className="fw-bold">{option.name}</Card.Title>
                <Card.Text className="text-muted">{option.description}</Card.Text>
                <p className="text-muted"><strong>Pros:</strong> {option.advantages}</p>
                <p className="text-muted"><strong>Cons:</strong> {option.limitations}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TravelOptions;
