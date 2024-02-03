package ro.upt.atrium.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Slot;
import ro.upt.atrium.service.CourseService;
import ro.upt.atrium.service.SlotService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class CourseController {

    @Autowired
    private CourseService courseService;
    @Autowired
    private SlotService slotService;

    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        System.out.println(courses);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{courseid}")
    public ResponseEntity<Course> deleteCourse(@PathVariable Long courseid) {
        courseService.deleteCourse(courseid);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/course/{courseid}")
    public ResponseEntity<Optional<Course>> getCourse(@PathVariable Long courseid) {
        Optional<Course> course = courseService.getCourse(courseid);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        System.out.println("Entered.");
        if (!course.getSlots().isEmpty()){
            for (Slot slot : course.getSlots()) {
                slotService.createSlot(slot);
            }
        }


        Course returnedCourse = courseService.createCourse(course);
        return new ResponseEntity<>(returnedCourse, HttpStatus.CREATED);
    }
}
