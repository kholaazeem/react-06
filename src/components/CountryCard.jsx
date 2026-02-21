import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <Col lg={3} md={4} sm={6} xs={12} className="mb-4">
      <Card className="h-100 shadow-sm border-0">
        <Card.Img 
          variant="top" 
          src={country.flags?.svg} 
          alt={country.name?.common} 
          style={{ height: '160px', objectFit: 'cover', borderBottom: '1px solid #f0f0f0' }} 
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate" title={country.name?.common}>
            {country.name?.common}
          </Card.Title>
          <Card.Text className="text-muted">
            <strong>Region:</strong> {country.region}
          </Card.Text>
          <Link to={`/country/${country.name?.common}`} className="mt-auto">
            <Button variant="primary" size="sm" className="w-100 fw-semibold">
              View Details
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CountryCard;