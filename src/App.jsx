import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import NotFound from "./pages/NotFound";

// Yahan hum routes define kar rahe hain
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // Agar kisi page mein error aata hai (jaise Home load na ho), toh ye 404 dikhayega
    errorElement: <NotFound />,
  },
  {
    // :name ka matlab hai ke ye dynamic route hai
    path: "/country/:name",
    element: <CountryDetail />,
  },
]);

function App() {
  // RouterProvider pure app ko routing ki power deta hai
  return <RouterProvider router={router} />;
}

export default App;