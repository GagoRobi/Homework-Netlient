package hu.ugyfelkartya.netlienthomework.controller;

import hu.ugyfelkartya.netlienthomework.model.Dto.UserDto;
import hu.ugyfelkartya.netlienthomework.model.User;
import hu.ugyfelkartya.netlienthomework.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public User authenticate(@RequestParam String email, @RequestParam String password){
        return service.authenticateUser(email, password);
    }

    @PostMapping
    public User register(@RequestBody UserDto userDto){
        return service.register(userDto);
    }
}