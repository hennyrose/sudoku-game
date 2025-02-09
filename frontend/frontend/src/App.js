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

const API_BASE = "https://sudoku-larose8.herokuapp.com/api";

export default App;