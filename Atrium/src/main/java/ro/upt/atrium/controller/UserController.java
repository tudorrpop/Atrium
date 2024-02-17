package ro.upt.atrium.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.upt.atrium.model.User;
import ro.upt.atrium.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/checkUser")
    public ResponseEntity<User> getCourse(@RequestParam String email, @RequestParam String name) {

        System.out.println(email);
        System.out.println(name);

        User user = userService.getUser(email);

        if (user == null){
            user = new User(email, name);
            userService.createUser(user);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
