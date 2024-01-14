package ro.upt.atrium.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


}
