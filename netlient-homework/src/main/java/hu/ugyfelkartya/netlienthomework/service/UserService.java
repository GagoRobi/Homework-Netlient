package hu.ugyfelkartya.netlienthomework.service;

import hu.ugyfelkartya.netlienthomework.model.Dto.UserDto;
import hu.ugyfelkartya.netlienthomework.model.User;
import hu.ugyfelkartya.netlienthomework.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User authenticateUser(String email, String password){
        return userRepository.findByEmailAndPassword(email, password).orElseThrow(NoSuchElementException::new);
    }

    public User register(UserDto userDto) {
        return userRepository.save(User.builder()
                .email(userDto.email())
                .password(userDto.password())
                .build());
    }
}
