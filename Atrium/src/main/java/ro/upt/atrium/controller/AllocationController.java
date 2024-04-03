package ro.upt.atrium.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.upt.atrium.model.Choice;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Slot;
import ro.upt.atrium.model.Student;
import ro.upt.atrium.service.AllocationService;
import ro.upt.atrium.service.CourseService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class AllocationController {

    @Autowired
    CourseService courseService;

    @Autowired
    AllocationService allocationService;

    @PostMapping("/allocate/{courseid}")
    public ResponseEntity<CourseDTO> createCourse(@PathVariable Long courseid) {
        Course course = courseService.getCourse(courseid);


        System.out.println(courseid);
        allocationService.startAllocationProcess(course);

        Map<Long, List<Student>> groups = new HashMap<>();
        course.getSlots().forEach(slot -> groups.put(slot.getSlotid(), new ArrayList<>(0)));

        course.getStudents().forEach(student -> {
            Choice choice = student.getChoices().stream().filter(c -> c.getCourse().equals(course)).findFirst().orElse(null);
            Slot slot = choice.getPreferredSlots().get(0);
            groups.get(slot.getSlotid()).add(student);
        });

        System.out.println("Test");
        CourseDTO courseDTO = new CourseDTO(course.getCourseName(), course.getAlgorithm(), course.getPreferencesDeadline(),
                course.getProfessor(), course.getSlots(), course.getStudents(), course.isFinalized(), groups);

        return new ResponseEntity<>(courseDTO, HttpStatus.CREATED);
    }
}
