import { Slot } from "./slot";

export class Course {
    id: number | undefined;

    algorithm: Algorithm | undefined;
    courseName: String | undefined;
    preferencesDeadline: Date | undefined;
    slots: Slot[] | undefined;

    // allocationDate: Date | undefined;
    // visibility: boolean | undefined;

    constructor(
        courseName: String,
        algorithm: Algorithm, 
        preferencesDeadline: Date, 
        slots: Slot[]) {
        this.id = Math.random();
        this.courseName = courseName;
        this.algorithm = algorithm;
        this.preferencesDeadline = preferencesDeadline;
        this.slots = slots
      }
}