import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <Col lg={3} md={4} sm={6} xs={12} className="mb-4">
      {/* Hover effect wali class yahan lagi hai */}
      <Card className="h-100 border-0 hover-card rounded-4 overflow-hidden shadow-sm">
        
        {/* Ab image ke upar Link laga diya hai, picture par click karne se bhi page change hoga */}
        <Link to={`/country/${country.name?.common}`}>
          <Card.Img 
            variant="top" 
            src={country.flags?.svg} 
            alt={country.name?.common || "Country Flag"} 
            style={{ 
              height: '160px', 
              objectFit: 'cover', 
              borderBottom: '3px solid #f8f9fa',
              cursor: 'pointer' 
            }} 
          />
        </Link>

        <Card.Body className="d-flex flex-column text-center p-4">
          <Card.Title className="fw-bold mb-3 text-truncate" title={country.name?.common}>
            {country.name?.common || "Unknown"}
          </Card.Title>
          
          <div className="text-muted small mb-4">
            <p className="mb-1">📍 Region: {country.region || "N/A"}</p>
            <p className="mb-0">🏛️ Capital: {country.capital?.[0] || "N/A"}</p>
          </div>

          <Link to={`/country/${country.name?.common}`} className="mt-auto">
            <Button variant="dark" size="sm" className="w-100 fw-bold rounded-pill shadow-sm">
              Explore Details ➔
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CountryCard;