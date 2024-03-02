package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalTime;

@Entity
@Getter
public class Slot implements Serializable {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotid;

    @Enumerated(EnumType.STRING)
    private Day day;

    @Enumerated(EnumType.STRING)
    private Time time;

    private int capacity;

    public Slot() {
    }

    public Slot(Day day, Time time, int capacity) {
        this.day = day;
        this.time = time;
        this.capacity = capacity;
    }

}
