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

//    public User DEPRECATEDauthenticateUser(String email, String password){
//        return userRepository.findByUsernameAndPassword(email, password).orElseThrow(NoSuchElementException::new);
//    }
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
