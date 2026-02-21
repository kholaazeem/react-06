import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container>
        {/* Logo / Brand Name */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-uppercase tracking-wide">
          🌍 Global Explorer
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;