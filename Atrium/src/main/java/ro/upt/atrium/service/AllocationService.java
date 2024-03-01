package ro.upt.atrium.service;

import org.springframework.stereotype.Service;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Student;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AllocationService {

    public AllocationService() {
    }

    public void startAllocationProcess(Course course){
        if (course.getAlgorithm().equals("STANDARD_ALGORITHM"))
            standardAllocation(course);
        else
            galeShapleyAllocation(course);

    }

    public void standardAllocation(Course course){

        List<Student> students = course.getStudents();
        Map<Long, List<Student>> groups = new HashMap<>();

        course.getSlots().forEach(slot -> groups.put(slot.getSlotid(), new ArrayList<>(slot.getCapacity())));


        for (int i = 0; i < students.size(); i++){

            Student student = students.get(i);


        }

    }







    public void galeShapleyAllocation(Course course){}

}
