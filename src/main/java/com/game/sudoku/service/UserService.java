package com.game.sudoku.service;

import com.game.sudoku.entity.User;
import com.game.sudoku.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findOrCreateUser(Long telegramId, String username) {
        User user = userRepository.findByTelegramId(telegramId);
        if (user == null) {
            user = new User();
            user.setTelegramId(telegramId);
            user.setUsername(username);
            userRepository.save(user);
        }
        return user;
    }

    public void updateScore(Long telegramId, int additionalScore) {
        User user = userRepository.findByTelegramId(telegramId);
        if (user != null) {
            user.setScore(user.getScore() + additionalScore);
            userRepository.save(user);
        }
    }

    public User getUserDetails(Long telegramId) {
        return userRepository.findByTelegramId(telegramId);
    }
}