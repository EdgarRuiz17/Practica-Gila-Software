import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from "react";

//views
import Products from "./views/ShowProducts";
import Error from "./views/Error";
import CreateProduct from "./views/CreateProduct";

//Compoents
import Header from "./components/Header";


function App() {
  return (
    <section>
      <InitialRoutes />
    </section>
  );
}

//routes
const InitialRoutes = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
