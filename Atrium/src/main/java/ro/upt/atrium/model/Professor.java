package ro.upt.atrium.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Professor extends User implements Serializable {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long professorid;

    @JsonIgnore
    @OneToMany(mappedBy = "professor")
    private List<Course> courses;

    public Professor() {
    }

    public Professor(String email, String name, String username, LocalDate joindate) {
        super(email, name, username, joindate);
        this.courses = new ArrayList<>();
    }
}
