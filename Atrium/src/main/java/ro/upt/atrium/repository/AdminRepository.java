package ro.upt.atrium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.upt.atrium.model.Administrator;

@Repository
public interface AdminRepository extends JpaRepository<Administrator, Long> {

    Administrator findByUsername(String username);
}
