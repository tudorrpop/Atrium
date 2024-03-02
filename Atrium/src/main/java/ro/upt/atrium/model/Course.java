package ro.upt.atrium.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
public class Course implements Serializable {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseid;

    @Getter
    private String courseName;
    @Getter
    private String algorithm;

    private LocalDate preferencesDeadline;


    @Setter
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "professor_id", referencedColumnName = "professorid")
    private Professor professor;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Slot> slots;

    @ManyToMany(mappedBy = "courses", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Student> students;

    public Course() {
    }

    public Course(String courseName, String algorithm, LocalDate preferencesDeadline, List<Slot> slots) {
        this.courseName = courseName;
        this.algorithm = algorithm;
        this.preferencesDeadline = preferencesDeadline;

        this.students = new ArrayList<>();
        this.slots = slots;
    }
    public void enrollStudentIntoCourse(Student student){
        students.add(student);
    }

}
