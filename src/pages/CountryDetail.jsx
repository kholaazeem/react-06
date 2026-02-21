import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Card, Row, Col } from "react-bootstrap";

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then((data) => setCountry(data[0]));
  }, [name]);

  if (!country) return <p>Loading...</p>;

  return (
    <Container className="mt-5">
      <Link to="/"><Button variant="outline-dark" className="mb-4">← Wapas</Button></Link>
      <Card className="p-4 shadow">
        <Row className="align-items-center">
          <Col md={6}>
            <img src={country.flags.svg} alt="flag" className="img-fluid rounded" />
          </Col>
          <Col md={6}>
            <h1>{country.name.common}</h1>
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ")}</p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default CountryDetail;