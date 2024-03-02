package ro.upt.atrium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.upt.atrium.model.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Professor findByEmail(String email);

}