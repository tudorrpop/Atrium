package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;

@Entity
@Getter
public class User implements Serializable {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;

    private String email;
    private String name;

    public User() {

    }

    public User(String email, String name) {
        this.email = email;
        this.name = name;
    }
}
