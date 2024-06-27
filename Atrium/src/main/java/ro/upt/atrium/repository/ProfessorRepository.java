package ro.upt.atrium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.upt.atrium.model.Professor;


@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Professor findByEmail(String email);
}