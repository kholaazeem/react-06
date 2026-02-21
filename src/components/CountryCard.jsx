import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <Col md={3} className="mb-4">
      <Card className="h-100 shadow-sm border-0">
        <Card.Img 
          variant="top" 
          src={country.flags.svg} 
          alt={country.name.common} 
          style={{ height: '160px', objectFit: 'cover' }} 
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{country.name.common}</Card.Title>
          <Card.Text>Region: {country.region}</Card.Text>
          <Link to={`/country/${country.name.common}`} className="mt-auto">
            <Button variant="primary" size="sm" className="w-100">Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CountryCard;