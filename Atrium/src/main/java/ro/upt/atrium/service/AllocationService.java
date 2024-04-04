package ro.upt.atrium.service;

import lombok.AccessLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.helper.CSVWriter;
import ro.upt.atrium.helper.TextReader;
import ro.upt.atrium.model.*;
import ro.upt.atrium.repository.StudentRepository;

import java.util.*;

@Service
public class AllocationService {


    private final CourseService courseService;

    private final StudentRepository studentRepository;

    @Autowired
    public AllocationService(CourseService courseService, StudentRepository studentRepository) {
        this.courseService = courseService;
        this.studentRepository = studentRepository;
    }

    public void startAllocationProcess(Course course) {

        Course course_test = TextReader.shapeInput("/Users/tudorpop/Documents/TudorPop/Personal/Atrium/atrium/src/main/java/ro/upt/atrium/helper/example5.txt");

        galeShapleyAllocation(course_test);

//        standardAllocation(course);

    }

    public void galeShapleyAllocation(Course course) {

        List<Student> students = new ArrayList<>(course.getStudents());

        Map<Long, List<Student>> groups = new HashMap<>();
        course.getSlots().forEach(slot -> groups.put(slot.getSlotid(), new ArrayList<>(0)));

        Map<Long, List<Student>> intermediateAllocation = new HashMap<>();
        course.getSlots().forEach(slot -> intermediateAllocation.put(slot.getSlotid(), new ArrayList<>(0)));

        Map<Long, Integer> capacities = new HashMap<>();
        course.getSlots().forEach(slot -> capacities.put(slot.getSlotid(), slot.getCapacity()));

        int round = 0;
        int flag = 0;

        while (!students.isEmpty()) {

            System.out.println("Number of students: " + students.size());
            allocateStudents(students, intermediateAllocation, capacities, course);

            System.out.println("TEST");
            students.removeAll(checkOverPopulatedSlots(groups, intermediateAllocation, capacities));

            if (round == 4){
                flag = 1;
                break;
            }else{
                round++;
            }
        }

        if (flag == 1){
            System.out.println("Nu ne-au ajuns rundele");
            for (int i = 0; i < students.size(); i++){
                System.out.println(students.get(i).getName());
            }
        }


        for (Map.Entry<Long, List<Student>> entry : groups.entrySet()) {
            if (entry.getValue().isEmpty())
                System.out.println("GOL");
        }

        CSVWriter.printResult(course, groups);

    }

    public List<Student> checkOverPopulatedSlots(Map<Long, List<Student>> groups, Map<Long, List<Student>> intermediateAllocation, Map<Long, Integer> capacities) {

        List<Student> allocatedStudents = new ArrayList<>();

        for (Map.Entry<Long, List<Student>> entry : intermediateAllocation.entrySet()) {

            if (entry.getValue().size() <= capacities.get(entry.getKey())) {
                // Cazul in care numarul de studenti alocati este mai mic sau egal cu capacitatea slotului respectiv
                groups.get(entry.getKey()).addAll(entry.getValue());
                allocatedStudents.addAll(entry.getValue());

                // Actualizam numarul de locuri ramase
                capacities.put(entry.getKey(), capacities.get(entry.getKey()) - entry.getValue().size());

                entry.getValue().clear();

            } else {
                int numberOfOverAllocation = entry.getValue().size() - capacities.get(entry.getKey());
                long seed = 123456;

                Random random = new Random(seed);
                Collections.shuffle(entry.getValue(), random);

                List<Student> unluckyStudents = entry.getValue().subList(0, numberOfOverAllocation);
                entry.getValue().removeAll(unluckyStudents);

                groups.get(entry.getKey()).addAll(entry.getValue());
                allocatedStudents.addAll(entry.getValue());

                capacities.put(entry.getKey(), 0);
            }
        }

        for (Map.Entry<Long, List<Student>> entry : intermediateAllocation.entrySet()) {
            entry.getValue().clear();
        }

        return allocatedStudents;
    }

    private void allocateStudents(List<Student> students, Map<Long, List<Student>> intermediateAllocation, Map<Long, Integer> capacities, Course course) {
        for (int i = 0; i < students.size(); i++) {
            Student student = students.get(i);
            Choice choice = student.getChoices().stream().filter(c -> c.getCourse().equals(course)).findFirst().orElse(null);
            for (int j = 0; j < choice.getPreferredSlots().size(); j++){
                if (capacities.get(choice.getPreferredSlots().get(j).getSlotid()) > 0 ){
                    intermediateAllocation.get(choice.getPreferredSlots().get(j).getSlotid()).add(student);
                    break;
                }
            }
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

//        CSVWriter.printResult(course, groups);

        course.setStudents(students);
        course.getStudents().addAll(remainedStudents);
        course.setFinalized(true);

        courseService.saveCourse(course);

    }

}
