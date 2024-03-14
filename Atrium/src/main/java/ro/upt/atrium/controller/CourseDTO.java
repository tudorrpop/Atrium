package ro.upt.atrium.controller;

import ro.upt.atrium.model.Slot;

import java.time.LocalDate;
import java.util.List;

public record CourseDTO(String courseName, String algorithm, LocalDate preferencesDeadline, List<Slot> slots) {
}
