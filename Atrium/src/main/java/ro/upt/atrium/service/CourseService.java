package ro.upt.atrium.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.repository.CourseRepository;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }

    public Course createCourse(Course course){
        return courseRepository.save(course);
    }

}
