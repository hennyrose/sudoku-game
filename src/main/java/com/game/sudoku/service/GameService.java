package com.game.sudoku.service;

import com.game.sudoku.util.Sudoku;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private Sudoku sudoku;

    public int[][] generateSudokuBoard() {
        sudoku = new Sudoku(); // Створити новий Sudoku-пазл.
        return sudoku.getPuzzle(); // Повернути дошку з пропусками.
    }

    public boolean checkSudokuValue(int row, int col, int value) {
        if (sudoku == null) {
            throw new IllegalStateException("Дошка Sudoku ще не створена.");
        }
        return sudoku.checkValue(row, col, value); // Перевірити правильність.
    }
}