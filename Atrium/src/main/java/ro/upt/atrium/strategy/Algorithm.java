package ro.upt.atrium.strategy;

import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Student;

import java.util.List;
import java.util.Map;

public interface Algorithm {
    Map<Long, List<Student>> processData(Course course);
}
