package ro.upt.atrium.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

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
    private String algorithm;

    private LocalDate preferencesDeadline;
//
//    @OneToOne
//    private Professor professor;

    @JsonIgnore
    @OneToMany
    private List<Student> students;

    @OneToMany
    private List<Slot> slots;

    public Course() {
    }

    public Course(String courseName, String algorithm, LocalDate preferencesDeadline, List<Slot> slots) {
        this.courseName = courseName;
        this.algorithm = algorithm;
        this.preferencesDeadline = preferencesDeadline;

        this.students = new ArrayList<>();
        this.slots = slots;
    }

}
