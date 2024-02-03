import { Slot } from "./slot";

export class Course {

    courseid?: number | undefined 
    
    algorithm: String | undefined;
    courseName: String | undefined;
    preferencesDeadline: Date | undefined;
    slots: Slot[] | undefined;

    constructor(
        courseName: String,
        algorithm: String, 
        preferencesDeadline: Date, 
        slots: Slot[]) {
          
        this.courseName = courseName;
        this.algorithm = algorithm;
        this.preferencesDeadline = preferencesDeadline;
        this.slots = slots
      }
}