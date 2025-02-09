package com.game.sudoku.controller;

import com.game.sudoku.entity.User;
import com.game.sudoku.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestParam Long telegramId, @RequestParam String username) {
        return userService.findOrCreateUser(telegramId, username);
    }

    @PostMapping("/{telegramId}/score")
    public String updateScore(@PathVariable Long telegramId, @RequestParam int additionalScore) {
        userService.updateScore(telegramId, additionalScore);
        return "Score updated!";
    }

    @GetMapping("/{telegramId}")
    public User getUser(@PathVariable Long telegramId) {
        return userService.getUserDetails(telegramId);
    }
}