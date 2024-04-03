package ro.upt.atrium.strategy;


import ro.upt.atrium.model.Course;

public interface Algorithm {

    public Course allocateStudents(Course course);
}
