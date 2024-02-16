package ro.upt.atrium.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.upt.atrium.model.User;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class UserController {

    @PostMapping("/authentication")
    public ResponseEntity<?> loginUser(@RequestBody User userData) {
        System.out.println("Username: " + userData.getUsername());
        System.out.println("Password: " + userData.getPassword());



        return ResponseEntity.ok("Authentication successful!");
    }
}
