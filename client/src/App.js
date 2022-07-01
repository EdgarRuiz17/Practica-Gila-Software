import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from "react";

//views
import Index from "./views/Index";
import Error from "./views/Error";


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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<Error />} />
          </Routes>
      </Router>
    </div>
  );
};

export default App;
