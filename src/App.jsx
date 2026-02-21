import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout ab main container hai
    errorElement: <NotFound />, // Agar koi error aaye toh 404 page dikhaye
    children: [
      {
        path: "/",
        element: <Home />, // Home page layout ke andar khulega
      },
      {
        path: "/country/:name",
        element: <CountryDetail />, // Detail page bhi layout ke andar khulega
      },
      {
        path: "*",
        element: <NotFound />, // Galat link par 404 page
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;