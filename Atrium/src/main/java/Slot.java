package main.java;

import java.time.LocalTime;

public class Slot {

    private int capacity;
    private LocalTime hour;
    private Day day;

    public Slot(int capacity, LocalTime hour, Day day) {
        this.hour = hour;
        this.capacity = capacity;
        this.day = day;
    }

}
