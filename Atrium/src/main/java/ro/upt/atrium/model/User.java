package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Getter
@MappedSuperclass
@Setter
public abstract class User {

    @Getter
    private String email;
    private String username;
    private String name;
    private LocalDate joinDate;
    private String role;


    public User() {

    }

    public User(String email, String name, String username, LocalDate joinDate) {
        this.email = email;
        this.name = name;
        this.username = username;
        this.joinDate = joinDate;

        if (email.contains("student"))
            this.role = "Student";
        else
            this.role = "Professor";
    }

}
