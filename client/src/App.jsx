import "./App.css";
import React, { useState, useContext, useEffect } from "react";
import List from "./components/List";
import Header from "./components/Header";
import Counter from "./components/Counter";
import Input from "./components/Input";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ScrollButton from "./components/ScrollButton";
import { ToDoProvider } from "./context/ToDoContext";
import LoginModal from "./components/LoginModal";

function App() {
  return (
    <ToDoProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <LoginModal />
                  <Input />
                  <Counter />
                  <List />
                </>
              }
            ></Route>
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <ScrollButton />
        </div>
      </Router>
    </ToDoProvider>
  );
}

export default App;
