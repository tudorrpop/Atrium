package ro.upt.atrium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.upt.atrium.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByEmail(String email);
}
