import React from "react";
import "./App.css";
import SudokuGame from "./SudokuGame";

function App() {
  return (
      <div className="App">
        <SudokuGame />
      </div>
  );
}

const API_BASE = "http://localhost:8080/api";

export default App;