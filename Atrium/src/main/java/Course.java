package main.java;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;

public class Course {

    @Getter
    private String courseID;
    @Getter
    private List<Slot> options = new ArrayList<>();
    @Getter
    private List<Student> students = new ArrayList<>();

    public Course(String courseID) {
        this.courseID = courseID;
    }

    public void addSlot(Slot option) {
        options.add(option);
    }

    public void addStudent(Student student) {
        students.add(student);
    }

}
