package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public abstract class User {

    @Id
    @Column(nullable = false, updatable = false)
    private Long userID;

    private String username;
    private String email;
    private String name;

    public User() {

    }

    public User(String username, String email, String name) {
        this.username = username;
        this.email = email;
        this.name = name;
    }
}
