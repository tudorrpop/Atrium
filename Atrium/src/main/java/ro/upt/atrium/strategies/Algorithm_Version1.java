package ro.upt.atrium.strategies;

import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Slot;
import ro.upt.atrium.model.Student;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Algorithm_Version1 implements Algorithm{
    @Override
    public Map<String, List<Student>> processData(Course course) {
        Map<String, List<Student>> finalAllocation = new HashMap<>();
        List<Slot> slots = course.getOptions();
        List<Student> students = new ArrayList<>(course.getStudents());

        slots.forEach(slot -> finalAllocation.put(slot.getSlotID(), new ArrayList<>()));

        for (Student student : new ArrayList<>(students)) {
            for (Slot option : student.getPreferences()) {
                String slotID = option.getSlotID();
                List<Student> allocatedStudents = finalAllocation.get(slotID);
                if (allocatedStudents.size() < option.getCapacity()) {
                    allocatedStudents.add(student);
                    students.remove(student);
                    break;
                }
            }
        }
        return finalAllocation;
    }
}
