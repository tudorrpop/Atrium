package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Student extends User implements Serializable {

    public Student() {

    }

    public Student(String username, String email, String name, List<Slot> courses, List<Slot> preferences) {
        super(username, email, name);
    }
}
