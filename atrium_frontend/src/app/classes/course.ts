import { Slot } from "./slot";

export class Course {
    id: number | undefined;

    visibility: boolean | undefined;
    courseName: String | undefined;
    preferencesDeadline: Date | undefined;
    allocationDate: Date | undefined;
    slots: Slot[] | undefined;

    constructor(visibility: boolean, 
        courseName: String, 
        preferencesDeadline: Date, 
        allocationDate: Date,
        slots: Slot[]) {
        this.id = Math.random();
        this.courseName = courseName;
        this.preferencesDeadline = preferencesDeadline;
        this.allocationDate = allocationDate;
        this.slots = slots
      }
}