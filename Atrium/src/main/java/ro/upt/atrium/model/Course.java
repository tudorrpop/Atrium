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

    @ManyToOne(fetch = FetchType.EAGER)
    @Setter
    @JoinColumn(name = "professorid")
    @JsonBackReference
    private Professor professor;

    @JsonIgnore
    @OneToMany
    private List<Student> students;

    @OneToMany
    private List<Slot> slots;

    public Course() {
        this.students = new ArrayList<>();
        this.slots = new ArrayList<>();
    }

    public Course(String courseName, String algorithm, LocalDate preferencesDeadline, List<Slot> slots) {
        this.courseName = courseName;
        this.algorithm = algorithm;
        this.preferencesDeadline = preferencesDeadline;

        this.students = new ArrayList<>();
        this.slots = slots;
    }

}
