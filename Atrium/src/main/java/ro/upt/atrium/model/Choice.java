package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter
public class Choice implements Serializable {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long choiceID;

    @OneToOne
    private Course course;

    @OneToMany
    private List<Slot> preferredSlots;
    @OneToMany
    private List<Slot> generalSlots;

}
