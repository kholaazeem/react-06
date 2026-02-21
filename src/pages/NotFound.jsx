import { Link } from "react-router-dom";
const NotFound = () => (
  <div className="text-center mt-5">
    <h1>404 - Page Nahi Mila!</h1>
    <Link to="/">Home par wapas jayein</Link>
  </div>
);
export default NotFound;