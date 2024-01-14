package ro.upt.atrium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.upt.atrium.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
