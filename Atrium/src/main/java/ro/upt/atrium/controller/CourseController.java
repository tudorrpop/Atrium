package ro.upt.atrium.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.service.CourseService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController {

    @Autowired
    private CourseService courseService;


    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        System.out.println(course);
        System.out.println(course.getName());
        System.out.println(course.isVisibility());
        Course newCourse = courseService.createCourse(course);
        return new ResponseEntity<>(newCourse, HttpStatus.CREATED);
    }
}
