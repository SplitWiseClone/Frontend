import './App.css';
import React from 'react';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp.jsx";
import Login from "./Login";

function App() {
    const [user, setUser] = React.useState(null);

  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
