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
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data from API");
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error loading countries. Please check your internet connection.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  // Safe filtering using optional chaining (?.)
  const safeCountries = Array.isArray(countries) ? countries : [];
  const filteredCountries = safeCountries.filter((c) =>
    c.name?.common?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredCountries.slice(firstIndex, lastIndex);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading countries...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 fw-bold">World Countries Platform</h2>
      <Form.Control 
        type="text" 
        placeholder="Search for a country by name..." 
        className="mb-4 shadow-sm py-2"
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // Reset to first page when searching
        }}
      />
      
      <Row>
        {currentItems.length > 0 ? (
          currentItems.map((country) => (
            <CountryCard key={country.cca3 || country.name.common} country={country} />
          ))
        ) : (
          <Col><p className="text-center text-muted">No countries found.</p></Col>
        )}
      </Row>

      {/* Hide pagination if there are no countries to paginate */}
      {filteredCountries.length > itemsPerPage && (
        <Pagination className="justify-content-center mt-4 mb-5">
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
      )}
    </Container>
  );
};

export default Home;