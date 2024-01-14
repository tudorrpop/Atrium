package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Course implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long courseID;

    private String courseName;

    private boolean visibility;

    private LocalDate preferencesDeadline, allocationDate;

    private String imageURL;

    public Course() {
    }

    public Course(String courseName, boolean visibility, String imageURL) {
        this.courseName = courseName;
        this.visibility = visibility;
        this.preferencesDeadline = null;
        this.imageURL = imageURL;

        this.allocationDate = null;
    }

    public String getName() {
        return courseName;
    }

    public boolean isVisibility() {
        return visibility;
    }
}
