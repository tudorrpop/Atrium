package ro.upt.atrium.service;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.repository.CourseRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourse(Long courseid) {
        return courseRepository.findCourseByCourseid(courseid);
    }

    public void saveCourse(Course course) {
        courseRepository.save(course);
    }

    @Transactional
    public void deleteCourse(Long courseid) {
        courseRepository.deleteById(courseid);
    }


}
