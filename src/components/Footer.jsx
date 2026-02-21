const Footer = () => {
  return (
    <footer className="footer-custom mt-5">
      <div className="container">
        <p className="mb-0 fs-6">
          &copy; {new Date().getFullYear()} Global Explorer Platform. Built by Khola.
        </p>
      </div>
    </footer>
  );
};

export default Footer;