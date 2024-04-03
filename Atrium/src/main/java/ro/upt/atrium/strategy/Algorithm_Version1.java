package ro.upt.atrium.strategy;


import ro.upt.atrium.model.Choice;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Slot;
import ro.upt.atrium.model.Student;

import java.util.*;

public class Algorithm_Version1 implements Algorithm {

    public Course allocateStudents(Course course){
        List<Student> students = new ArrayList<>(course.getStudents());
        List<Student> remainedStudents = new ArrayList<>(0);

        Map<Long, ArrayList<Student>> groups = new HashMap<>();
        course.getSlots().forEach(slot -> groups.put(slot.getSlotid(), new ArrayList<>(0)));

        boolean notfound;

        for (int i = 0; i < students.size(); i++) {
            notfound = false;

            Choice choice = students.get(i).getChoices().stream()
                    .filter(c -> c.getCourse().equals(course))
                    .findFirst()
                    .orElse(null);

            if (choice != null) {

                for (int j = 0; j < choice.getPreferredSlots().size(); j++) {
                    Slot slot = choice.getPreferredSlots().get(j);

                    int slotSize = Objects.requireNonNull(course.getSlots().stream().filter(s -> s.getSlotid().equals(slot.getSlotid()))
                            .findFirst().orElse(null)).getCapacity();

                    if (groups.get(slot.getSlotid()).size() < slotSize) {
                        groups.get(slot.getSlotid()).add(students.get(i));
                        choice.setAllocated(true);
                        choice.getGeneralSlots().clear();
                        choice.getPreferredSlots().removeIf(s -> !s.equals(slot));
                        notfound = true;
                        break;

                    }
                }
            }

            if (!notfound){
                remainedStudents.add(students.get(i));
            }

            System.out.println("Studentul " + students.get(i).getName() + " a fost alocat la slotul " +
                    Objects.requireNonNull(Objects.requireNonNull(students.get(i).getChoices().stream().filter(x -> x.getCourse().equals(course))
                            .findFirst().orElse(null)).getPreferredSlots().stream().findFirst().orElse(null)).getTime());
        }

        for (int i = 0; i < remainedStudents.size(); i++) {

            for (int j = 0; j < course.getSlots().size(); j++) {

                long slotID = course.getSlots().get(j).getSlotid();

                if (groups.get(slotID).size() < course.getSlots().get(j).getCapacity()) {
                    groups.get(slotID).add(remainedStudents.get(i));
                    Choice choice = remainedStudents.get(i).getChoices().stream().filter(c -> c.getCourse().equals(course))
                            .findFirst().orElse(null);
                    choice.setAllocated(true);
                    choice.getGeneralSlots().clear();

                    choice.getPreferredSlots().add(course.getSlots().get(j));
                    choice.getPreferredSlots().removeIf(s -> !s.getSlotid().equals(slotID)); // problema IN CAZUL IN CARE SLOTUL NU SE REGASESTE IN LISTA.
                    break;
                }
            }
        }
        return course;
    }
}
