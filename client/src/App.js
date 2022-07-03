import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from "react";

//views
import Index from "./views/Index";
import Error from "./views/Error";
import CreateProduct from "./views/CreateProduct";
import Header from "./components/Header";


function App() {
  return (
    <section>
      <InitialRoutes/>
    </section>
  );
}

//routes
const InitialRoutes = () => {
  return (
    <div>
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="*" element={<Error />} />
          </Routes>
      </Router>
    </div>
  );
};

export default App;
