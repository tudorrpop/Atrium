package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
@Entity
public class Administrator implements Serializable {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long administratorid;

    @Getter
    private String username;
    @Getter
    private String password;

    public Administrator() {
    }

}
