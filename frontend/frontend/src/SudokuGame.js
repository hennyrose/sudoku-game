import React, { useState, useEffect } from "react";
import api from "./api/instance";

const SudokuGame = () => {
    const [board, setBoard] = useState([]);                // Поточна дошка Sudoku
    const [selectedCell, setSelectedCell] = useState(null); // Координати обраної клітинки
    const [completed, setCompleted] = useState(false);       // Позначка, що судоку вирішено

    // Завантаження нової дошки з бекенду
    const fetchSudoku = () => {
        api.get("/games/new")
            .then((response) => {
                setBoard(response.data);
                setSelectedCell(null);
                setCompleted(false);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchSudoku();
    }, []);

    // Перевірка, чи всі клітинки заповнено (проста перевірка для демо)
    const isSolved = (currentBoard) => {
        return currentBoard.flat().every((cell) => cell !== 0);
    };

    // Обробник кліку на клітинку (записуємо координати, якщо вона порожня)
    const handleCellClick = (row, col) => {
        // Якщо обрана клітинка вже містить число (тобто не 0) — ігноруємо
        if (board[row][col] !== 0) return;

        // Встановлюємо нову вибрану клітинку
        setSelectedCell({ row, col });
    };

    // Обробник кліку на число (перевіряє й підставляє правильне)
    const handleNumberClick = (number) => {
        if (selectedCell) {
            const { row, col } = selectedCell;
            const updatedBoard = [...board];

            // Попередньо встановимо обране число
            updatedBoard[row][col] = number;

            // Надсилаємо запит для перевірки числа
            api.post("/games/check", { row, col, value: number })
                .then((response) => {
                    const isCorrect = response.data;
                    if (isCorrect) {
                        // Якщо число вірне, лишаємо його
                        setBoard(updatedBoard);
                        // Знімаємо виділення
                        setSelectedCell(null);

                        // Перевіряємо, чи розв’язано всю дошку
                        if (isSolved(updatedBoard)) {
                            setCompleted(true);
                        }
                    } else {
                        // Якщо число невірне — повертаємо клітинку в стан 0 (порожня)
                        updatedBoard[row][col] = 0;
                        setBoard(updatedBoard);

                        // Відображаємо короткочасну підсвітку "incorrect"
                        const cellEl = document.getElementById(`cell-${row}-${col}`);
                        if (cellEl) {
                            cellEl.classList.add("incorrect");
                            setTimeout(() => {
                                cellEl.classList.remove("incorrect");
                            }, 1000);
                        }
                        // Знімаємо виділення
                        setSelectedCell(null);
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    // Оновлення/створення нової дошки
    const handleRegenerate = () => {
        fetchSudoku();
    };

    // Якщо судоку вирішено, відображаємо повідомлення і кнопку перегенерації
    if (completed) {
        return (
            <div>
                <h1>Congratulations! Puzzle Solved!</h1>
                <button onClick={handleRegenerate}>Regenerate</button>
            </div>
        );
    }

    // Інакше відображаємо Sudoku-дошку й панель з числами для введення
    return (
        <div>
            <h1>Sudoku Game</h1>

            <table>
                <tbody>
                {board.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => {
                            // Динамічне призначення класу для виділення клітинки
                            const cellClass = [
                                cell === 0 ? "empty-cell" : "filled-cell",
                                selectedCell &&
                                selectedCell.row === rowIndex &&
                                selectedCell.col === colIndex
                                    ? "selected-cell"
                                    : ""
                            ].join(" ");

                            return (
                                <td
                                    key={colIndex}
                                    id={`cell-${rowIndex}-${colIndex}`}
                                    className={cellClass}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                >
                                    {cell !== 0 ? cell : ""}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="button-container">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button key={num} onClick={() => handleNumberClick(num)}>
                        {num}
                    </button>
                ))}
            </div>

            <div className="button-container">
                <button id="regenerate" onClick={handleRegenerate}>
                    Generate New Board
                </button>
            </div>
        </div>
    );
};

export default SudokuGame;