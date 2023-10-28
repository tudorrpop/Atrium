package ro.upt.atrium.strategies;

import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Student;

import java.util.List;
import java.util.Map;

public interface Algorithm {
    Map<String, List<Student>> processData(Course course);
}
