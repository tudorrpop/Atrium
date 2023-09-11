package main.java;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class Student {

    @Getter
    private String studentID;
    @Getter
    private List<Slot> prefferences = new ArrayList<>();

    public Student(String studentID) {
        this.studentID = studentID;
    }

    public void addPreference(Slot option) {
        prefferences.add(option);
    }

}
