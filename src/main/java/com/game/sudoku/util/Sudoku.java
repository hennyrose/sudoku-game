package com.game.sudoku.util;

import java.util.Random;

public class Sudoku {

    private final int[][] solution; // Fully generated solution board (completed).
    private final int[][] puzzle; // Puzzle board with empty cells for the player.

    public Sudoku() {
        solution = new int[9][9];
        puzzle = new int[9][9];
        generateSolution(); // Generate a valid completed board.
        generatePuzzle(); // Remove some numbers to create the puzzle.
    }

    /**
     * Generates a valid completed Sudoku solution.
     */
    private void generateSolution() {
        fillBoard(solution);
    }

    /**
     * Fills the provided board with a valid Sudoku solution using random numbers.
     */
    private boolean fillBoard(int[][] board) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == 0) { // Only fill empty cells.
                    int[] numbers = shuffleNumbers(); // Get randomized numbers.
                    for (int num : numbers) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num; // Place a valid number.
                            if (fillBoard(board)) {
                                return true; // Continue if successful.
                            }
                            board[row][col] = 0; // Backtrack if it fails later.
                        }
                    }
                    return false; // If no valid number is found, backtrack.
                }
            }
        }
        return true;
    }

    /**
     * Returns a shuffled array of numbers 1-9.
     */
    private int[] shuffleNumbers() {
        int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        Random random = new Random();
        for (int i = numbers.length - 1; i > 0; i--) {
            int index = random.nextInt(i + 1);
            int temp = numbers[index];
            numbers[index] = numbers[i];
            numbers[i] = temp;
        }
        return numbers;
    }

    /**
     * Validates if placing the given number in the specified position is valid
     * according to Sudoku rules (row, column, and sub-grid constraints).
     */
    private boolean isValid(int[][] board, int row, int col, int num) {
        // Check the row and the column for duplicates.
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == num || board[i][col] == num) {
                return false;
            }
        }

        // Check the 3x3 sub-grid for duplicates.
        int subGridRowStart = (row / 3) * 3;
        int subGridColStart = (col / 3) * 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[subGridRowStart + i][subGridColStart + j] == num) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Generates a Sudoku puzzle by removing numbers from the solution.
     */
    private void generatePuzzle() {
        for (int i = 0; i < 9; i++) {
            System.arraycopy(solution[i], 0, puzzle[i], 0, 9); // Copy the solution.
        }

        Random random = new Random();
        int emptyCells = 40; // Define the number of empty cells (e.g., 40 for medium difficulty).

        while (emptyCells > 0) {
            int row = random.nextInt(9);
            int col = random.nextInt(9);

            if (puzzle[row][col] != 0) { // Remove only if not already empty.
                puzzle[row][col] = 0;
                emptyCells--;
            }
        }
    }

    /**
     * Provides the completed solution board.
     */
    public int[][] getSolution() {
        return solution;
    }

    /**
     * Provides the puzzle board with empty cells.
     */
    public int[][] getPuzzle() {
        return puzzle;
    }

    /**
     * Checks if the provided value is correct for the given cell.
     */
    public boolean checkValue(int row, int col, int value) {
        return solution[row][col] == value; // Compare with the solution.
    }
}