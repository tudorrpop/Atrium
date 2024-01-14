package ro.upt.atrium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.upt.atrium.model.Course;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    void deleteCourseByCourseID(Long CourseID);
    Optional<Course> findCourseByCourseID(Long CourseID);
}
