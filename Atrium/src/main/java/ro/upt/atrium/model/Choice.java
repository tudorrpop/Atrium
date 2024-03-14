package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Choice implements Serializable {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long choiceid;

    @Setter
    private boolean allocated;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "courseid")
    private Course course;

    @ManyToMany
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
    @ManyToMany
    private List<Slot> generalSlots;


    public Choice() {
    }

    public Choice(Course course) {
        this.course = course;
        this.allocated = false;

        this.preferredSlots = new ArrayList<>(course.getSlots().size());
        this.generalSlots = new ArrayList<>(course.getSlots());
    }

    @Override
    public String toString() {
        return "Choice{" +
                "choiceid=" + choiceid +
                ", allocated=" + allocated +
                ", preferredSlots=" + preferredSlots +
                '}';
    }
}
