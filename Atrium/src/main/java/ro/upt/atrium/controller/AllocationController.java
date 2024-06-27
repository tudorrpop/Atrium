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
    public ResponseEntity<Course> startAllocationProcess(@PathVariable Long courseid) {

        Course course = courseService.getCourse(courseid);
        allocationService.startAllocationProcess(course);

        return new ResponseEntity<>(course, HttpStatus.CREATED);
    }
}
