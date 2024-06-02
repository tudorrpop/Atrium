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

        Student student = (Student) userService.getUser(email);
        List<Course> courses = courseService.getAllCourses();

        courses.removeAll(student.getCourses());
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

        // Get student and course of interest
        Student student = (Student) userService.getUser(email);
        Course course = courseService.getCourse(courseid);

        // Create and save new choice
        Choice choice = new Choice(course);
        choiceService.saveChoice(choice);

        // Add created choice to the student.
        student.enrollStudentIntoCourse(choice);
        student.getCourses().add(course);
        userService.saveUser(student);

//        // Add student to the students list of the course.
//        course.enrollStudentIntoCourse(student);
//        courseService.saveCourse(course);

        return new ResponseEntity<>(choice, HttpStatus.CREATED);
    }

    @DeleteMapping("/drop/{choiceid}")
    public ResponseEntity<Course> deleteChoice(@PathVariable Long choiceid, @RequestParam String email) {
        Choice choice = choiceService.getChoice(choiceid);

        Course course = choice.getCourse();

        Student student = (Student) userService.getUser(email);

        student.getChoices().remove(choice);

        course.getStudents().remove(student);
        student.getCourses().remove(course);

        choiceService.deleteChoice(choice);

        return new ResponseEntity<>(HttpStatus.OK);
    }




}
