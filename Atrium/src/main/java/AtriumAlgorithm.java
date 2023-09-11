package main.java;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AtriumAlgorithm {

    public Map<Slot, List<Student>> processData(Course course) throws NoSuchAlgorithmException {

        List<Student> students = course.getStudents();
        List<Slot> slots = course.getOptions();

        SecureRandom secureRandom = SecureRandom.getInstanceStrong();

        Map<Slot, List<Student>> finalChoices = new HashMap<>();

        int i = 0;
        while (i < students.size()) {
            Student student = students.get(secureRandom.nextInt(students.size()));
            finalChoices.get(student.getPrefferences().get(0)).add(student);
            Collections.shuffle(students);
            i++;
        }

        return finalChoices;
    }
}
