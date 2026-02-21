import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet /> {/* Ye Outlet automatic aapke pages ko yahan load karega */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;