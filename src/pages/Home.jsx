import { useState, useEffect } from "react";
import { Container, Row, Form, Spinner, Alert, Pagination } from "react-bootstrap";
import CountryCard from "../components/CountryCard";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Data fetch karne mein masla hua!");
        setLoading(false);
      });
  }, []);

  // Filter Search
  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredCountries.slice(firstIndex, lastIndex);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Duniya ki Maloomat (Countries)</h2>
      <Form.Control 
        type="text" 
        placeholder="Country search karein..." 
        className="mb-4 shadow-sm"
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <Row>
        {currentItems.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </Row>

     <Pagination className="justify-content-center mt-4">
  <Pagination.Prev 
    disabled={currentPage === 1} 
    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
  />
  <Pagination.Item active>{currentPage}</Pagination.Item>
  <Pagination.Next 
    disabled={lastIndex >= filteredCountries.length}
    onClick={() => setCurrentPage(p => p + 1)} 
  />
</Pagination>
    </Container>
  );
};

export default Home;