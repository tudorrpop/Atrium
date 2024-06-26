package ro.upt.atrium.service;

import lombok.AccessLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.helper.CSVWriter;
import ro.upt.atrium.helper.TextReader;
import ro.upt.atrium.model.*;
import ro.upt.atrium.repository.StudentRepository;
import ro.upt.atrium.strategy.Algorithm;
import ro.upt.atrium.strategy.Algorithm_Gale_Shapley;
import ro.upt.atrium.strategy.Algorithm_Standard;

import java.util.*;

@Service
public class AllocationService {
    private final CourseService courseService;
    private Algorithm algorithm;

    @Autowired
    public AllocationService(CourseService courseService, StudentRepository studentRepository) {
        this.courseService = courseService;
        this.algorithm = null;
    }

    public void startAllocationProcess(Course course) {

        Course course_test = TextReader.shapeInput("/Users/tudorpop/Documents/TudorPop/Personal/Atrium/atrium/src/main/java/ro/upt/atrium/helper/example5.txt");

        if (course.getAlgorithm().equals("STANDARD_ALGORITHM"))
            algorithm = new Algorithm_Standard();

        if (course.getAlgorithm().equals("GALE_SHAPLEY_ALGORITHM")){
            long seed = 124356;
            algorithm = new Algorithm_Gale_Shapley(seed);
        }

        if (algorithm != null)
            courseService.saveCourse(algorithm.startAllocationprocess(course));

    }
}
