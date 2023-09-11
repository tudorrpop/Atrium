package main.java;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalTime;

public class Runner {

    public static void main(String[] args) throws NoSuchAlgorithmException {

        AtriumAlgorithm atriumAlgorithm = new AtriumAlgorithm();

        Course course = new Course("000");

        Slot slot1 = new Slot(3, LocalTime.of(16, 30), Day.MONDAY);
        Slot slot2 = new Slot(3, LocalTime.of(20, 0), Day.TUESDAY);
        Slot slot3 = new Slot(3, LocalTime.of(18, 0), Day.FRIDAY);

        Student tudor = new Student("111");
        tudor.addPreference(slot1);
        tudor.addPreference(slot2);
        tudor.addPreference(slot3);

        Student andrei = new Student("222");
        andrei.addPreference(slot2);
        andrei.addPreference(slot1);
        andrei.addPreference(slot3);

        Student david = new Student("333");
        david.addPreference(slot3);
        david.addPreference(slot2);
        david.addPreference(slot1);

        course.addStudent(tudor);
        course.addStudent(andrei);
        course.addStudent(david);

        //atriumAlgorithm.processData(course);

        SecureRandom secureRandom = SecureRandom.getInstanceStrong();
        for (int i = 0; i < 10; i++) {
            System.out.println(secureRandom.nextInt(10 - i));
        }
    }
}
