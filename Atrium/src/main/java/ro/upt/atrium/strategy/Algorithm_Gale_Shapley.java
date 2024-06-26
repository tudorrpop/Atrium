package ro.upt.atrium.strategy;

import ro.upt.atrium.helper.CSVWriter;
import ro.upt.atrium.model.Choice;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Student;
import ro.upt.atrium.service.CourseService;

import java.util.*;

public class Algorithm_Gale_Shapley implements Algorithm {
    private Random random;

    public Algorithm_Gale_Shapley(long seed) {
        this.random = new Random(seed);
    }

    public Course startAllocationprocess(Course course) {

        List<Student> students = new ArrayList<>(course.getStudents());

        Map<Long, List<Student>> groups = new HashMap<>();
        course.getSlots().forEach(slot -> groups.put(slot.getSlotid(), new ArrayList<>(0)));

        Map<Long, List<Student>> intermediateAllocation = new HashMap<>();
        course.getSlots().forEach(slot -> intermediateAllocation.put(slot.getSlotid(), new ArrayList<>(0)));

        Map<Long, Integer> capacities = new HashMap<>();
        course.getSlots().forEach(slot -> capacities.put(slot.getSlotid(), slot.getCapacity()));

        int round = 0;

        while (!students.isEmpty() && round < 5) {

            allocateStudents(students, intermediateAllocation, capacities, course);

            students.removeAll(checkOverPopulatedSlots(groups, intermediateAllocation, capacities));

            round++;
        }

        while (!students.isEmpty()) {
            Collections.shuffle(students, random);
            Student student = students.get(0);

            for (Map.Entry<Long, Integer> entry : capacities.entrySet()) {
                if (entry.getValue() != 0) {
                    groups.get(entry.getKey()).add(student);
                    capacities.put(entry.getKey(), entry.getValue() - 1);
                    break;
                }
            }

            students.remove(student);
        }


//        CSVWriter.printResult(course, groups);

        course.getStudents().clear();
        for (List<Student> studentList : groups.values()) {
            course.getStudents().addAll(studentList);
        }
        course.setFinalized(true);

        return course;
    }

    private List<Student> checkOverPopulatedSlots(Map<Long, List<Student>> groups, Map<Long,
            List<Student>> intermediateAllocation, Map<Long, Integer> capacities) {

        List<Student> allocatedStudents = new ArrayList<>();

        for (Map.Entry<Long, List<Student>> entry : intermediateAllocation.entrySet()) {

            if (entry.getValue().size() <= capacities.get(entry.getKey())) {

                groups.get(entry.getKey()).addAll(entry.getValue());
                allocatedStudents.addAll(entry.getValue());
                capacities.put(entry.getKey(), capacities.get(entry.getKey()) - entry.getValue().size());

                entry.getValue().clear();

            } else {

                int numberOfOverAllocation = entry.getValue().size() - capacities.get(entry.getKey());

                Collections.shuffle(entry.getValue(), random);

                List<Student> unluckyStudents = entry.getValue().subList(0, numberOfOverAllocation);
                entry.getValue().removeAll(unluckyStudents);

                groups.get(entry.getKey()).addAll(entry.getValue());
                allocatedStudents.addAll(entry.getValue());

                capacities.put(entry.getKey(), 0);
                entry.getValue().clear();
            }
        }

        return allocatedStudents;
    }

    private void allocateStudents(List<Student> students, Map<Long, List<Student>> intermediateAllocation, Map<Long,
            Integer> capacities, Course course) {

        for (int i = 0; i < students.size(); i++) {

            Student student = students.get(i);
            Choice choice = student.getChoices().stream()
                    .filter(c -> c.getCourse().equals(course)).findFirst().orElse(null);

            for (int j = 0; j < Objects.requireNonNull(choice).getPreferredSlots().size(); j++) {

                if (capacities.get(choice.getPreferredSlots().get(j).getSlotid()) > 0) {
                    intermediateAllocation.get(choice.getPreferredSlots().get(j).getSlotid()).add(student);
                    break;
                }

            }
        }
    }


}
