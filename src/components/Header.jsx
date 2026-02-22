import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
// Yahan humne FontAwesome se Globe ka icon import kiya hai
import { FaGlobeAmericas } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar expand="lg" sticky="top" className="pro-navbar shadow-lg py-3">
      <Container>
        {/* Logo / Brand Name */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-white d-flex align-items-center">
          
          {/* Emoji ki jagah ab PRO Icon aa gaya, jiska color humne halka sa blue (text-primary) rakha hai */}
          <FaGlobeAmericas className="me-2 fs-3 text-primary" /> 
          
          <span style={{ letterSpacing: '1px' }}>Global Explorer</span>
        </Navbar.Brand>

        {/* Mobile View Toggle Button (Hamburger Menu) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none bg-light opacity-75" />
        
        {/* Navbar Links (Right Side) */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center mt-3 mt-lg-0">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            
            <Nav.Link href="https://restcountries.com/" target="_blank" className="nav-link-custom">
              API Docs
            </Nav.Link>
            
            {/* Call to Action Button */}
            <a 
              href="https://github.com/kholaazeem" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-custom-outline ms-lg-4 mt-3 mt-lg-0 rounded-pill px-4 py-2 fw-bold"
            >
              My GitHub
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;