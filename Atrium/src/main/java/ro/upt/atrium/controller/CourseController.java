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

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class CourseController {

    @Autowired
    private AllocationController allocationController;

    @Autowired
    private CourseService courseService;
    @Autowired
    private SlotService slotService;
    @Autowired
    private UserService userService;


    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAllCourses(@RequestParam String email) {

        User user = userService.getUser(email);
        List<Course> courses = ((Professor) user).getCourses();

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
    public ResponseEntity<CourseDTO> getCourse(@PathVariable Long courseid) {
        Course course = courseService.getCourse(courseid);

        Map<Long, List<Student>> groups = new HashMap<>();
        course.getSlots().forEach(slot -> groups.put(slot.getSlotid(), new ArrayList<>(0)));

        List<Long> idlist = new ArrayList<>();
        course.getStudents().forEach(s -> idlist.add(s.getStudentid()));
        System.out.println(idlist);

        course.getStudents().forEach(student -> {
            Choice choice = student.getChoices().stream().filter(c -> c.getCourse().equals(course)).findFirst().orElse(null);
            Slot slot = choice.getPreferredSlots().get(0);
            groups.get(slot.getSlotid()).add(student);
        });

        System.out.println("Test");
        CourseDTO courseDTO = new CourseDTO(course.getCourseName(), course.getAlgorithm(), course.getPreferencesDeadline(),
                course.getProfessor(), course.getSlots(), course.getStudents(), course.isFinalized(), groups);

//        System.out.println(courseDTO);
        return new ResponseEntity<>(courseDTO, HttpStatus.CREATED);

    }


    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestBody Course course, @RequestParam String email) {

        System.out.println(course.getPreferencesDeadline());

        Professor professor = (Professor) userService.getUser(email);

        if (!course.getSlots().isEmpty()) {
            for (Slot slot : course.getSlots()) {
                slotService.createSlot(slot);
            }
        }

        course.setProfessor(professor);

        Course returnedCourse = courseService.createCourse(course);

        return new ResponseEntity<>(returnedCourse, HttpStatus.CREATED);
    }
}
