import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // Catches runtime errors in the Home component
    errorElement: <NotFound />,
  },
  {
    path: "/country/:name",
    element: <CountryDetail />,
    errorElement: <NotFound />,
  },
  {
    // Catch-all route for invalid URLs
    path: "*",
    element: <NotFound />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;