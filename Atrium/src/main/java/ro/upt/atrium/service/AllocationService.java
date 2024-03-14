package ro.upt.atrium.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.helper.CSVWriter;
import ro.upt.atrium.helper.TextReader;
import ro.upt.atrium.model.Choice;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Slot;
import ro.upt.atrium.model.Student;

import java.util.*;

@Service
public class AllocationService {


    private final EmailService emailService;

    @Autowired
    public AllocationService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void startAllocationProcess() {

        Course course = TextReader.shapeInput("/Users/tudorpop/Documents/TudorPop/Personal/Atrium/atrium/src/main/java/ro/upt/atrium/helper/example5.txt");
        standardAllocation(course);

    }

    public void standardAllocation(Course course) {

        List<Student> students = new ArrayList<>(course.getStudents());
        List<Student> remainedStudents = new ArrayList<>(0);

        Map<Long, ArrayList<Student>> groups = new HashMap<>();
        course.getSlots().stream().forEachOrdered(slot -> groups.put(slot.getSlotid(), new ArrayList<>(0)));

        boolean notfound = false;

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
                    students.get(i).getChoices().stream().filter(x -> x.getCourse().equals(course))
                            .findFirst().orElse(null).getPreferredSlots().stream().findFirst().orElse(null).getTime());
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

        CSVWriter.printResult(course, groups);

//
//        String subject = "UPT Allocation for course " + course.getCourseName();
//        String message = "You've been allocated to the slot: MONDAY, 12:00 - 14:00";
//        emailService.sendEmail("pop.tudor1@gmail.com", subject, message);

    }


    public void galeShapleyAllocation(Course course) {
    }

}
