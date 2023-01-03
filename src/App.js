import './App.css';
import React from 'react';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Logout from "./Logout";
import AddExpense from "./AddExpense";
import SendResetPasswordEmail from "./SendResetPasswordEmail";
import ResetPassword from "./ResetPassword";
import ListAllTransactions from "./ListAllTransactions";
import SimplifiedBalance from "./SimplifiedBalance";
function App() {
    const [user, setUser] = React.useState(null);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="addExpense" element={<AddExpense />} />
              <Route path="resetPassword" element={<SendResetPasswordEmail />} />
              <Route path="api/user/reset/:uid/:token" element={<ResetPassword />} />
            <Route path="listAllTransactions" element={<ListAllTransactions />} />
            <Route path="simplifiedBalance" element={<SimplifiedBalance />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
