import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthContextProvider from "./Context/AuthContextProvider";
import DisplayPaste from "./Pages/DisplayPaste";

import Find from "./Pages/Find";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find" element={<Find />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/paste" element={<DisplayPaste />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
