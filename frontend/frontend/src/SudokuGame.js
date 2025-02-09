import React, { useState, useEffect } from "react";
import api from "./api/instance";

const SudokuGame = () => {
    const [board, setBoard] = useState([]); // Current puzzle board state
    const [selectedCell, setSelectedCell] = useState(null); // Track active cell
    const [completed, setCompleted] = useState(false); // Check if the puzzle is solved

    // Fetch the Sudoku puzzle from the backend
    const fetchSudoku = () => {
        api.get("/games/new")
            .then((response) => {
                setBoard(response.data); // Initialize the board with the puzzle
                setSelectedCell(null); // Reset selected cell
                setCompleted(false); // Mark as not completed
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchSudoku(); // Fetch a new puzzle when the component is mounted
    }, []);

    // Check if the puzzle is fully solved
    const isSolved = (currentBoard) => {
        return currentBoard.flat().every((cell) => cell !== 0); // Check if all cells are filled
    };

    // Handle clicking on a cell (set it as active)
    const handleCellClick = (row, col) => {
        if (board[row][col] === 0) {
            setSelectedCell({ row, col }); // Set the clicked empty cell as selected
        }
    };

    // Handle clicking a number (validate and place it into the selected cell)
    const handleNumberClick = (number) => {
        if (selectedCell) {
            const { row, col } = selectedCell; // Get the selected cell's coordinates

            api.post("/games/check", { row, col, value: number }) // Validate the number from the backend
                .then((response) => {
                    const isCorrect = response.data;

                    const updatedBoard = [...board];
                    updatedBoard[row][col] = number; // Temporarily set cell value regardless

                    if (isCorrect) {
                        setBoard(updatedBoard); // Update the board with the correct value
                        setSelectedCell(null); // Deselect the cell

                        // Check if the puzzle is solved
                        if (isSolved(updatedBoard)) {
                            setCompleted(true);
                        }
                    } else {
                        // Temporarily mark the cell as incorrect with a CSS class
                        document.getElementById(`cell-${row}-${col}`).classList.add("incorrect");
                        setTimeout(() => {
                            document.getElementById(`cell-${row}-${col}`).classList.remove("incorrect");
                        }, 1000); // Remove the "incorrect" style after 1 second
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    // Handle regenerating a new puzzle
    const handleRegenerate = () => {
        fetchSudoku(); // Fetch a new puzzle
    };

    // If the puzzle is completed, show a "Congratulations" message and regenerate button
    if (completed) {
        return (
            <div>
                <h1>Congratulations! Puzzle Solved!</h1>
                <button onClick={handleRegenerate}>Regenerate</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Sudoku Game</h1>

            {/* Sudoku Grid */}
            <table>
                <tbody>
                {board.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td
                                key={colIndex}
                                id={`cell-${rowIndex}-${colIndex}`}
                                className={cell === 0 ? "empty-cell" : "filled-cell"}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                style={{
                                    backgroundColor:
                                        selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                                            ? "lightblue"
                                            : "white",
                                }}
                            >
                                {cell !== 0 ? (
                                    <span>{cell}</span> // Show the value if it's not empty
                                ) : (
                                    "" // For empty cells, no text shown
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Number Buttons */}
            <div style={{ marginTop: "20px" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                    <button
                        key={number}
                        onClick={() => handleNumberClick(number)}
                        disabled={!selectedCell} // Disable buttons until a cell is selected
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SudokuGame;