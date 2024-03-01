package ro.upt.atrium.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.upt.atrium.model.*;
import ro.upt.atrium.service.ChoiceService;
import ro.upt.atrium.service.CourseService;
import ro.upt.atrium.service.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class ChoiceController {


    @Autowired
    ChoiceService choiceService;

    @Autowired
    UserService userService;

    @Autowired
    CourseService courseService;

    @GetMapping("/choice/{choiceid}")
    public ResponseEntity<Choice> getCourse(@PathVariable Long choiceid) {
        Choice choice = choiceService.getChoice(choiceid);
        return new ResponseEntity<>(choice, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Choice> saveChoice(@RequestBody Choice choice, @RequestParam String email) {

        choiceService.saveChoice(choice);

        return new ResponseEntity<>(choice, HttpStatus.CREATED);
    }


    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses(@RequestParam String email) {
        User user = userService.getUser(email);
        List<Course> courses = courseService.getAllCourses();

        courses.removeIf(course -> course.getStudents().contains((Student) user));

        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/choices")
    public ResponseEntity<List<Choice>> getChoices(@RequestParam String email) {
        Student student = (Student) userService.getUser(email);

        List<Choice> choices = student.getChoices();

        return new ResponseEntity<>(choices, HttpStatus.OK);
    }

    @PostMapping("/enroll")
    public ResponseEntity<Choice> enrollCourse(@RequestBody Long courseid, @RequestParam String email) {


        Course course = courseService.getCourse(courseid);

        Choice choice = new Choice(course);
        choiceService.createChoice(choice);

        Student student = (Student) userService.getUser(email);
        student.getChoices().add(choice);

        // Save the Choice entity first to avoid cascading issues
        choiceService.createChoice(choice);

        // Now, save the Student entity
        userService.createUser(student);

        course.getStudents().add(student);

        courseService.saveCourse(course);


        return new ResponseEntity<>(choice, HttpStatus.CREATED);
    }




}
