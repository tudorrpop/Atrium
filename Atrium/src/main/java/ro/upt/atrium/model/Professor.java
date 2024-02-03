package ro.upt.atrium.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter
public class Professor extends User implements Serializable {

    @OneToMany
    private List<Course> courses;

    public Professor() {
    }

    public Professor(String username, String email, String name) {
        super(username, email, name);
    }
}
