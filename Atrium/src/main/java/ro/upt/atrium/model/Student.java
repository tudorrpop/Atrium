package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Student extends User implements Serializable {


    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentID;

    @OneToMany
    private List<Choice> options;


    public Student() {

    }

    public Student(String email, String name, String username, LocalDate joinDate) {
        super(email, name, username, joinDate);
        this.options = new ArrayList<>();
    }
}
