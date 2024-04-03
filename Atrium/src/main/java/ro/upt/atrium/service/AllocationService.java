package ro.upt.atrium.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.helper.CSVWriter;
import ro.upt.atrium.model.*;
import ro.upt.atrium.repository.StudentRepository;

import java.util.*;

@Service
public class AllocationService {


    private final CourseService courseService;

    private final StudentRepository studentRepository;

    @Autowired
    public AllocationService(CourseService courseService,  StudentRepository studentRepository) {
        this.courseService = courseService;
        this.studentRepository = studentRepository;
    }

    public void startAllocationProcess(Course course) {

//        Course course_test = TextReader.shapeInput("/Users/tudorpop/Documents/TudorPop/Personal/Atrium/atrium/src/main/java/ro/upt/atrium/helper/example5.txt");
//        Course crs = courseService.getCourse(Long.parseLong("2"));
        standardAllocation(course);

    }

    public void galeShapleyAllocation(Course course) {

        List<Student> students = new ArrayList<>(course.getStudents());

        Map<Long, ArrayList<Student>> groups = new HashMap<>();
        course.getSlots().stream().forEachOrdered(slot -> groups.put(slot.getSlotid(), new ArrayList<>(0)));

        int round = 0;

        while (!students.isEmpty()) {
            allocateStudents(students, groups, course, round);


            round++;
        }

    }

    private void allocateStudents(List<Student> students, Map<Long, ArrayList<Student>> groups, Course course, int round) {
        for (int i = 0; i < students.size(); i++) {
            Student student = students.get(i);
            Choice choice = student.getChoices().stream().filter(c -> c.getCourse().equals(course)).findFirst().orElse(null);

            groups.get(choice.getPreferredSlots().get(round).getSlotid()).add(student);
        }
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

            if (!notfound) {
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

        course.setStudents(students);
        course.getStudents().addAll(remainedStudents);
        course.setFinalized(true);

        courseService.saveCourse(course);

    }

}
