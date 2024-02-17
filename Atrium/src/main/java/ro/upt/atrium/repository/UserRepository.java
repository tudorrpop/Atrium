package ro.upt.atrium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.upt.atrium.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String username);
}
