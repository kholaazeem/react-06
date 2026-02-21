import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Card, Row, Col, Spinner, Alert, Badge } from "react-bootstrap";

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => {
        if (!res.ok) throw new Error("Country details not found.");
        return res.json();
      })
      .then((data) => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  // Loading State (Matched with Home page)
  if (loading) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="grow" variant="dark" style={{ width: '3rem', height: '3rem' }} />
        <h4 className="mt-4 fw-bold text-secondary">Loading details for {name}...</h4>
      </Container>
    );
  }

  // Error State
  if (error || !country) {
    return (
      <Container className="mt-5 text-center" style={{ minHeight: "50vh" }}>
        <Alert variant="danger" className="rounded-4 shadow-sm p-4 d-inline-block mt-5">
          <h4 className="fw-bold">Oops! Data Unavailable</h4>
          <p>{error || "We couldn't find the details for this country."}</p>
        </Alert>
        <br />
        <Link to="/">
          <Button variant="dark" className="rounded-pill px-4 mt-3">Back to Home</Button>
        </Link>
      </Container>
    );
  }

  // Extracting nested data safely
  const nativeName = country.name?.nativeName 
    ? Object.values(country.name.nativeName)[0]?.common 
    : country.name?.common;
    
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(", ") 
    : "N/A";
    
  const languages = country.languages 
    ? Object.values(country.languages) 
    : [];

  return (
    <Container className="mt-5 mb-5" style={{ minHeight: "70vh" }}>
      {/* Back Button */}
      <Link to="/" className="text-decoration-none">
        <Button variant="outline-dark" className="mb-4 rounded-pill fw-bold px-4 hover-card">
          ← Back to Explorer
        </Button>
      </Link>

      {/* Main Detail Card */}
      <Card className="p-4 p-md-5 shadow-lg border-0 rounded-4">
        <Row className="align-items-center">
          
          {/* Left Side: Flag Image */}
          <Col lg={5} md={6} className="text-center mb-4 mb-md-0">
            <img 
              src={country.flags?.svg} 
              alt={`${country.name?.common} flag`} 
              className="img-fluid rounded-3 shadow" 
              style={{ maxHeight: '350px', objectFit: 'cover', border: '1px solid #e5e7eb' }} 
            />
            {/* Display Coat of Arms if available */}
            {country.coatOfArms?.svg && (
              <div className="mt-4 text-center">
                <p className="text-muted small mb-2 fw-bold text-uppercase">Coat of Arms</p>
                <img 
                  src={country.coatOfArms.svg} 
                  alt="Coat of Arms" 
                  style={{ height: '80px', objectFit: 'contain' }} 
                />
              </div>
            )}
          </Col>

          {/* Right Side: Details */}
          <Col lg={7} md={6} className="ps-lg-5">
            <h1 className="display-4 fw-bolder mb-1 text-dark">{country.name?.common}</h1>
            <p className="text-muted fs-5 mb-4">Official Name: {country.name?.official}</p>
            
            <Row className="gy-3 mb-4">
              <Col sm={6}>
                <p className="mb-1"><strong>📍 Capital:</strong> {country.capital?.[0] || "None"}</p>
                <p className="mb-1"><strong>🌍 Region:</strong> {country.region}</p>
                <p className="mb-1"><strong>🗺️ Subregion:</strong> {country.subregion || "N/A"}</p>
                <p className="mb-1"><strong>🗣️ Native Name:</strong> {nativeName}</p>
              </Col>
              <Col sm={6}>
                <p className="mb-1"><strong>👥 Population:</strong> {country.population?.toLocaleString()}</p>
                <p className="mb-1"><strong>💵 Currency:</strong> {currencies}</p>
                <p className="mb-1"><strong>🕒 Timezone:</strong> {country.timezones?.[0] || "N/A"}</p>
                <p className="mb-1"><strong>📏 Area:</strong> {country.area?.toLocaleString()} km²</p>
              </Col>
            </Row>

            {/* Languages Badges */}
            <div className="mb-4">
              <strong className="d-block mb-2">🗣️ Languages Spoken:</strong>
              {languages.length > 0 ? (
                languages.map((lang, index) => (
                  <Badge bg="secondary" className="me-2 px-3 py-2 rounded-pill fw-normal shadow-sm" key={index}>
                    {lang}
                  </Badge>
                ))
              ) : (
                <span className="text-muted">No languages data available</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3 mt-4 pt-3 border-top">
              <a 
                href={country.maps?.googleMaps} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
              >
                🗺️ View on Google Maps
              </a>
            </div>

          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default CountryDetail;