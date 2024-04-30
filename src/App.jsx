import React from "react";
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import "./assets/compiled/css/app.css"
import "./assets/compiled/css/auth.css"
import "./assets/compiled/css/app-dark.css"
import "./assets/extensions/perfect-scrollbar/perfect-scrollbar.min.js"
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Authentication/Login.jsx";
import ForgotPassword from "./components/Authentication/ForgotPassword.jsx";
import ResetPassword from "./components/Authentication/ResetPassword.jsx";
import Template from "./components/Template.jsx";
import { ToastContainer } from 'react-toastify';

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <BrowserRouter>
      <ToastContainer theme={theme} hideProgressBar={false} />
      <Routes>
        <Route path="/*" element={<Template theme={theme} setTheme={setTheme} />} />
        <Route path="/login" element={<Login theme={theme} setTheme={setTheme} />} />
        <Route path="/forgot-password" element={<ForgotPassword theme={theme} setTheme={setTheme} />} />
        <Route path="/reset-password/:id" element={<ResetPassword theme={theme} setTheme={setTheme} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
