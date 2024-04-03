package ro.upt.atrium.controller;

import ro.upt.atrium.model.Professor;
import ro.upt.atrium.model.Slot;
import ro.upt.atrium.model.Student;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record CourseDTO(String courseName, String algorithm,
                        LocalDate preferencesDeadline, Professor professor,
                        List<Slot> slots, List<Student> students,
                        boolean finalized, Map<Long, List<Student>> groups) {

    @Override
    public String toString() {
        return "CourseDTO{" +
                "courseName='" + courseName + '\'' +
                ", algorithm='" + algorithm + '\'' +
                ", preferencesDeadline=" + preferencesDeadline +
                ", professor=" + professor +
                ", slots=" + slots +
                ", students=" + students +
                ", finalized=" + finalized +
                ", groups=" + groups +
                '}';
    }
}