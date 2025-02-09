package com.game.sudoku.controller;

import com.game.sudoku.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.game.sudoku.dto.SudokuCheckRequest;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameService gameService;

    // Генерація Sudoku-дошки (9x9) з пропусками
    @GetMapping("/new")
    public int[][] generateNewGame() {
        return gameService.generateSudokuBoard();
    }

    // Ендпоінт для перевірки коректності числа в клітинці
    @PostMapping("/check")
    public boolean checkSudokuCell(@RequestBody SudokuCheckRequest request) {
        return gameService.checkSudokuValue(request.getRow(), request.getCol(), request.getValue());
    }
}