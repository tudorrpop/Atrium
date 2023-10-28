package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalTime;

@Entity
@Getter
public class Slot implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private String slotID;

    private int capacity;
    private LocalTime hour;
    private Day day;

    public Slot() {
    }

    public Slot(int capacity, LocalTime hour, Day day) {
        this.capacity = capacity;
        this.hour = hour;
        this.day = day;
    }

    @Override
    public String toString() {
        return "Slot{" +
                "slotID='" + slotID + '\'' +
                ", capacity=" + capacity +
                ", hour=" + hour +
                ", day=" + day +
                '}';
    }
}
