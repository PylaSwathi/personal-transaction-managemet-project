import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Switch } from "react-router-dom";
import LoginPage, { LoginRouter } from "./components/LoginPage/index.js";
import { useState } from "react";
import DashBoard from "./components/DashBoard/index";
import Transactions from "./components/Transactions/index";
import Profile from "./components/Profile/index";
import ProtectedRoute from "./components/ProtectedRoute/index.js";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<LoginRouter />} />
      <Route
        exact
        path="/"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
