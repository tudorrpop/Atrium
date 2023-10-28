package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter
public class Student implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String studentID;
    private String username;
    private String name;
    private String email;

    @OneToMany(mappedBy = "student")
    private List<Slot> preferences;

}
