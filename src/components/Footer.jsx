import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pro-footer">
      <Container>
        <Row className="gy-4 text-center text-md-start">
          <Col md={4}>
            <h5 className="fw-bold text-white mb-3">🌍 Global Explorer</h5>
            <p className="text-muted small">
              A modern platform to discover the world's countries, regions, and demographics.
            </p>
          </Col>

          <Col md={4}>
            <h5 className="fw-bold text-white mb-3">Quick Links</h5>
            <div className="d-flex flex-column align-items-center align-items-md-start">
              <Link to="/" className="footer-link small">Home Page</Link>
              <a href="https://restcountries.com/" target="_blank" rel="noreferrer" className="footer-link small">
                REST API
              </a>
            </div>
          </Col>

          <Col md={4}>
            <h5 className="fw-bold text-white mb-3">Connect With Me</h5>
            <p className="text-muted small mb-2">Built by Khola Azeem</p>
            <div className="d-flex justify-content-center justify-content-md-start mt-2">
              <a href="https://github.com/kholaazeem" target="_blank" rel="noreferrer" className="social-icon">💻</a>
              <a href="#" className="social-icon">🔗</a>
            </div>
          </Col>
        </Row>

        <div className="footer-divider"></div>
        
        <Row>
          <Col className="text-center">
            <p className="mb-0 small text-muted">
              &copy; {new Date().getFullYear()} Global Explorer. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;