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

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "courseid")
    private Course course;

    @OneToMany
    @JoinTable(
            name = "preferred_slots",
            joinColumns = @JoinColumn(name = "choice_id"),
            inverseJoinColumns = @JoinColumn(name = "slot_id")
    )
    private List<Slot> preferredSlots;

    @JoinTable(
            name = "general_slots",
            joinColumns = @JoinColumn(name = "choice_id"),
            inverseJoinColumns = @JoinColumn(name = "slot_id")
    )
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
