package ro.upt.atrium.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Slot;
import ro.upt.atrium.service.AllocationService;
import ro.upt.atrium.service.CourseService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class AllocationController {

    @Autowired
    CourseService courseService;

    @Autowired
    AllocationService allocationService;

    @PostMapping("/allocate")
    public ResponseEntity<Course> createCourse() {
        Course course = new Course();

        allocationService.startAllocationProcess();


        return new ResponseEntity<>(course, HttpStatus.CREATED);
    }
}
