import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Todo from "./screens/Todo";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route
          path="/"
          element={
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Hello
                </p>
              </header>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
