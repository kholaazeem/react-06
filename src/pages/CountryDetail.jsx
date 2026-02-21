import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";

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

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading details...</p>
      </Container>
    );
  }

  if (error || !country) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger">{error || "Data unavailable"}</Alert>
        <Link to="/">
          <Button variant="dark">Back to Home</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Link to="/">
        <Button variant="outline-dark" className="mb-4">← Back to Explorer</Button>
      </Link>
      <Card className="p-4 shadow border-0">
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0">
            <img 
              src={country.flags?.svg} 
              alt={`${country.name?.common} flag`} 
              className="img-fluid rounded border shadow-sm" 
              style={{ maxHeight: '300px', objectFit: 'contain' }} 
            />
          </Col>
          <Col md={6}>
            <h1 className="fw-bold mb-4">{country.name?.common}</h1>
            <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
            <p><strong>Population:</strong> {country.population?.toLocaleString() || "N/A"}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion || "N/A"}</p>
            <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default CountryDetail;