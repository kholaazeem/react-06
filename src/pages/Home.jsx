import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Spinner, Alert, Pagination } from "react-bootstrap";
import CountryCard from "../components/CountryCard";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pro-Level States: Search ke sath ab Region Filter bhi hai
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    // Aapka fast wala API link yahan use hua hai!
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

  // Pro-Level Filtering: Search + Region dono ek sath kaam karenge
  const safeCountries = Array.isArray(countries) ? countries : [];
  const filteredCountries = safeCountries.filter((c) => {
    const matchesSearch = c.name?.common?.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = regionFilter === "All" || c.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  // Pagination Logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredCountries.slice(firstIndex, lastIndex);

  if (loading) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="grow" variant="dark" style={{ width: '3rem', height: '3rem' }} />
        <h4 className="mt-4 fw-bold text-secondary">Discovering the World...</h4>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center rounded-4 shadow-sm p-4">
          <h4>Oops! Something went wrong</h4>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Banner Section */}
      <div className="hero-section">
        <Container>
          <h1 className="display-4 fw-bold mb-3">Explore The World</h1>
          <p className="lead opacity-75">
            Discover details about every country, from populations to capitals and regions.
          </p>
        </Container>
      </div>

      <Container>
        {/* Glassmorphism Filter Panel */}
        <div className="glass-panel">
          <Row className="g-3">
            <Col md={8}>
              <Form.Control 
                type="text" 
                placeholder="🔍 Search for a country (e.g., Pakistan, Japan)..." 
                className="custom-input shadow-none"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // Jab naya search ho toh Page 1 par aa jayein
                }}
              />
            </Col>
            <Col md={4}>
              <Form.Select 
                className="custom-input shadow-none"
                style={{ cursor: 'pointer' }}
                onChange={(e) => {
                  setRegionFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">🌍 All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </Form.Select>
            </Col>
          </Row>
        </div>
        
        {/* Results Info */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-2">
          <h5 className="fw-bold text-dark m-0">
            {filteredCountries.length} <span className="text-muted fw-normal">Countries Found</span>
          </h5>
        </div>

        {/* Cards Grid */}
        <Row>
          {currentItems.length > 0 ? (
            currentItems.map((country) => (
              <CountryCard key={country.cca3 || country.name.common} country={country} />
            ))
          ) : (
            <Col className="text-center py-5">
              <h3 className="text-muted">No countries match your search! 🕵️‍♀️</h3>
              <p>Try changing the region or spelling.</p>
            </Col>
          )}
        </Row>

        {/* Styled Pagination */}
        {filteredCountries.length > itemsPerPage && (
          <Pagination className="justify-content-center mt-5 mb-5 custom-pagination">
            <Pagination.Prev 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
            >
              Previous
            </Pagination.Prev>
            
            <Pagination.Item active className="fw-bold">{currentPage}</Pagination.Item>
            
            <Pagination.Next 
              disabled={lastIndex >= filteredCountries.length}
              onClick={() => setCurrentPage(p => p + 1)} 
            >
              Next
            </Pagination.Next>
          </Pagination>
        )}
      </Container>
    </>
  );
};

export default Home;