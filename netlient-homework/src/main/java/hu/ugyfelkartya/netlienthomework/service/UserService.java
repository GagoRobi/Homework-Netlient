package hu.ugyfelkartya.netlienthomework.service;

import hu.ugyfelkartya.netlienthomework.model.Dto.UserDto;
import hu.ugyfelkartya.netlienthomework.model.entity.User;
import hu.ugyfelkartya.netlienthomework.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;


    public boolean authenticateUser(UserDto userDto){
        return userRepository.existsByUsernameAndPassword(userDto.username(), userDto.password());
    }


    public User register(UserDto userDto) {
        return userRepository.save(User.builder()
                .username(userDto.username())
                .password(userDto.password())
                .build());
    }
}
