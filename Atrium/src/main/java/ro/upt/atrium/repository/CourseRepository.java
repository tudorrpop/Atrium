package ro.upt.atrium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.upt.atrium.model.Course;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Course findCourseByCourseid(Long CourseID);
}
