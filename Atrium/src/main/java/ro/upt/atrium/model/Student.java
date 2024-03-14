package ro.upt.atrium.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Student extends User implements Serializable {


    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentid;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "courses_students",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> courses = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Choice> choices;

    public Student() {

    }

    public Student(String email, String name, String username, LocalDate joinDate) {
        super(email, name, username, joinDate);
        this.choices = new ArrayList<>();
    }

    public void enrollStudentIntoCourse(Choice choice){
        if (choice != null)
            choices.add(choice);
        else
            throw new IllegalArgumentException("The given choice for course enrollment is NULL");
    }

    @Override
    public String toString() {
        return "Student{" +
                "studentid=" + studentid +
                ", courses=" + courses +
                ", choices=" + choices +
                '}';
    }
}
