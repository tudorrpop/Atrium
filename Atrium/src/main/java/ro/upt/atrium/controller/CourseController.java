package ro.upt.atrium.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.upt.atrium.model.*;
import ro.upt.atrium.repository.CourseRepository;
import ro.upt.atrium.service.CourseService;
import ro.upt.atrium.service.SlotService;
import ro.upt.atrium.service.UserService;

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
    @Autowired
    private UserService userService;


    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAllCourses(@RequestParam String email) {

        User user = userService.getUser(email);
        List<Course> courses = ((Professor)user).getCourses();

        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{courseid}")
    public ResponseEntity<Course> deleteCourse(@PathVariable Long courseid) {
        Course course = courseService.getCourse(courseid);

        if (course.getProfessor() != null) {
            Professor professor = course.getProfessor();
            professor.getCourses().remove(course);
            course.setProfessor(null);
            userService.saveUser(professor);
        }

        courseService.deleteCourse(courseid);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    @GetMapping("/course/{courseid}")
    public ResponseEntity<Course> getCourse(@PathVariable Long courseid) {
        Course course = courseService.getCourse(courseid);

        if (course.getProfessor() == null)
            System.out.println("NULL");

        System.out.println(course.getProfessor().getName());
        return new ResponseEntity<>(course, HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestBody Course course, @RequestParam String email) {

        Professor professor = (Professor) userService.getUser(email);

        if (!course.getSlots().isEmpty()){
            for (Slot slot : course.getSlots()) {
                slotService.createSlot(slot);
            }
        }

        course.setProfessor(professor);

        Course returnedCourse = courseService.createCourse(course);

        return new ResponseEntity<>(returnedCourse, HttpStatus.CREATED);
    }
}
