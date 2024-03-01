package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Choice implements Serializable {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long choiceid;

    private boolean allocated;

    @OneToOne(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private Course course;

    @OneToMany
    private List<Slot> preferredSlots;
    @OneToMany
    private List<Slot> generalSlots;

    public Choice() {
    }

    public Choice(Course course) {
        this.course = course;
        this.allocated = false;

        this.preferredSlots = new ArrayList<>(course.getSlots().size());
        this.generalSlots = new ArrayList<>(course.getSlots());
    }
}
