package ro.upt.atrium.helper;

import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Slot;
import ro.upt.atrium.model.Student;

import java.io.FileWriter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CSVWriter {

    public static void printResult(Course course, Map<Long, List<Student>> groups){
        try (FileWriter writer = new FileWriter("result.txt")) {
            for (Map.Entry<Long, List<Student>> entry : groups.entrySet()) {
                Long key = entry.getKey();
                List<Student> students = entry.getValue();

                // Find the corresponding slot for the key in the course's slots
                Slot slot = findSlotByKey(course, key);

                // Write day and time information to the file
                if (slot != null) {
                    writer.write("Day: " + slot.getDay() + " Time: " + slot.getTime() + "\n");

                    // Write the list of students to the file
                    for (Student student : students) {
                        writer.write(student.getName() + "\n");
                    }

                    // Separate entries with a line break
                    writer.write("\n");
                }
            }
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception appropriately
        }



    }


    private static Slot findSlotByKey(Course course, Long key) {
        for (Slot slot : course.getSlots()) {
            if (slot.getSlotid().equals(key)) {
                return slot;
            }
        }
        return null; // Return null if no slot is found for the given key
    }
}
