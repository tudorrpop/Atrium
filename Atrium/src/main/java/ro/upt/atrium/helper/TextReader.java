package ro.upt.atrium.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.model.*;
import ro.upt.atrium.repository.CourseRepository;
import ro.upt.atrium.repository.ProfessorRepository;
import ro.upt.atrium.repository.SlotRepository;
import ro.upt.atrium.repository.StudentRepository;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;

@Service
public class TextReader {

    private static SlotRepository slotRepository = null;
    private static StudentRepository studentRepository = null;

    private static ProfessorRepository professorRepository = null;

    private static CourseRepository courseRepository = null;

    @Autowired
    public TextReader(SlotRepository slotRepository, StudentRepository studentRepository, ProfessorRepository professorRepository,
                      CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
        this.slotRepository = slotRepository;
        this.studentRepository = studentRepository;
        this.professorRepository = professorRepository;
    }

    public static Course shapeInput(String filePath) {

        Course course = new Course();
        ArrayList<Student> students;
        ArrayList<Choice> choices = null;
        ArrayList<Slot> slots;

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;

            while ((line = reader.readLine()) != null) {

                if (line.equals("--- Course Information ---"))
                    createCourse(reader, course);

                if (line.equals("--- Slots Information ---")) {
                    slots = new ArrayList<>(Objects.requireNonNull(createSlots(reader)));
                    course.setSlots(slots);
                }

                if (line.equals("--- Choices Information ---")) {
                    choices = new ArrayList<>(Objects.requireNonNull(createChoices(reader, course)));
                }

                if (line.equals("--- Students Information ---")) {
                    students = new ArrayList<>(Objects.requireNonNull(createStudents(reader, choices)));
                    course.setStudents(students);
                }

            }

        } catch (IOException e) {
            e.printStackTrace();
        }

//        courseRepository.save(course);
        return course;
    }


    private static void createCourse(BufferedReader reader, Course course) throws IOException {

        String line;

        while ((line = reader.readLine()) != null) {
            if (line.equals("--- END ---"))
                break;

            if (line.contains("courseid")) {
                String[] parts = line.split(":");
                course.setCourseid(Long.parseLong(parts[1].trim()));
            }

            if (line.contains("coursename")) {
                String[] parts = line.split(":");
                course.setCourseName(parts[1].trim());
            }
        }

        course.setProfessor(professorRepository.findByEmail("atrium.professor@uptro29158.onmicrosoft.com"));
        course.setAlgorithm("");
        course.setPreferencesDeadline(null);
        course.setStudents(new ArrayList<>());
        course.setSlots(new ArrayList<>());
        course.setFinalized(false);
//        course.setGroups(new ArrayList<>());
    }

    private static ArrayList<Slot> createSlots(BufferedReader reader) throws IOException {

        ArrayList<Slot> slots = new ArrayList<>();
        String line;
        Slot slot;
        String[] parts;

        while ((line = reader.readLine()) != null) {

            if (line.equals("--- END ---"))
                break;

            if (line.contains("slotid")) {
                slot = new Slot();
                parts = line.split(":");
                slot.setSlotid(Long.parseLong(parts[1].trim()));

                while ((line = reader.readLine()) != null) {

                    if (line.contains("slottime")) {
                        parts = line.split(":");
                        slot.setTime(setTime(parts[1].trim()));
                    }

                    if (line.contains("slotday")) {
                        parts = line.split(":");
                        slot.setDay(setDay(parts[1].trim()));
                    }

                    if (line.contains("slotcapacity")) {
                        parts = line.split(":");
                        slot.setCapacity(Integer.parseInt(parts[1].trim()));

                        slots.add(slot);
                        break;
                    }
                }


            }

        }

        slotRepository.saveAll(slots);

        return slots;
    }

    private static ArrayList<Choice> createChoices(BufferedReader reader, Course course) throws IOException {
        ArrayList<Choice> choices = new ArrayList<>();
        String line;
        Choice choice = null;
        String[] parts;

        while ((line = reader.readLine()) != null) {

            if (line.equals("--- END ---"))
                break;

            if (line.contains("choiceid")) {
                choice = new Choice();
                parts = line.split(":");
                choice.setChoiceid(Long.parseLong(parts[1].trim()));

                choice.setCourse(course);
                choice.setAllocated(false);
                choice.setGeneralSlots(new ArrayList<>());
                choice.setPreferredSlots(new ArrayList<>());
            } else {
                String[] values = line.split(",");
                for (String value : values) {

                    if (!value.trim().isEmpty()){
                        if (choice != null) {
                            choice.getPreferredSlots().add(course.getSlots().stream()
                                    .filter(s -> s.getSlotid().equals(Long.parseLong(value.trim())))
                                    .findFirst().orElse(null));
                        }
                    }


                }

                if (choice != null) {
                    choices.add(choice);
                    choice = null; // Reset choice for the next iteration
                }
            }

        }
        return choices;
    }

    private static ArrayList<Student> createStudents(BufferedReader reader, ArrayList<Choice> choices) throws IOException {
        ArrayList<Student> students = new ArrayList<>();
        String line;
        Student student;
        String[] parts;

        while ((line = reader.readLine()) != null) {

            if (line.equals("--- END ---"))
                break;

            if (line.contains("studentid")) {
                student = new Student();
                parts = line.split(":");
                student.setStudentid(Long.parseLong(parts[1].trim()));
                student.setCourses(null);
                student.setChoices(new ArrayList<>());

                while ((line = reader.readLine()) != null){
                    if (line.contains("studentname")){
                        parts = line.split(":");
                        student.setName(parts[1].trim());
                    }

                    if (line.contains("studentchoice")){
                        String[] values = line.split(":");

                        student.getChoices().add(choices.stream()
                                .filter(c -> c.getChoiceid().equals(Long.parseLong(values[1].trim())))
                                .findFirst().orElse(null));
                        break;
                    }
                }
                students.add(student);
            }
        }

        studentRepository.saveAll(students);
        return students;
    }


    private static Time setTime(String time) {
        return switch (time) {
            case "TIME_08_10" -> Time.TIME_08_10;
            case "TIME_10_12" -> Time.TIME_10_12;
            case "TIME_12_14" -> Time.TIME_12_14;
            case "TIME_14_16" -> Time.TIME_14_16;
            case "TIME_16_18" -> Time.TIME_16_18;
            case "TIME_18_20" -> Time.TIME_18_20;
            default -> null;
        };
    }

    private static Day setDay(String day) {
        return switch (day) {
            case "MONDAY" -> Day.MONDAY;
            case "TUESDAY" -> Day.TUESDAY;
            case "WEDNESDAY" -> Day.WEDNESDAY;
            case "THURSDAY" -> Day.THURSDAY;
            case "FRIDAY" -> Day.FRIDAY;
            default -> null;
        };
    }
}
