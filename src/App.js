import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Home from "./Home";
import Default from "./Default";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/SignIn" element={<SignIn />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Default />} />
         </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
