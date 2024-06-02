package ro.upt.atrium.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.upt.atrium.model.Professor;
import ro.upt.atrium.model.Student;
import ro.upt.atrium.model.User;
import ro.upt.atrium.service.UserService;

import java.time.LocalDate;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam String email) {

        User user = userService.getUser(email);

        if (user == null)
            System.out.println("SUNT NULL");
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/checkUser")
    public ResponseEntity<User> checkUser(@RequestParam String email, @RequestParam String name) {

        System.out.println(email);
        System.out.println(name);

        User user = userService.getUser(email);

        if (user == null){
            if (email.contains("@student")){
                user = new Student(email, name, email.substring(0, email.indexOf('@')), LocalDate.now());
            }else {
                user = new Professor(email, name, email.substring(0, email.indexOf('@')), LocalDate.now());
            }
            userService.saveUser(user);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @GetMapping("/authenticateAdminUser")
    public ResponseEntity<Boolean> getUser(@RequestParam String username, @RequestParam String password) {
        return new ResponseEntity<>(userService.validAdministrator(username,password), HttpStatus.OK);
    }
}
