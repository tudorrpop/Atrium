import { Slot } from "./slot";

export class Course {

    courseid?: number | undefined 
    
    algorithm: string | undefined;
    courseName: string | undefined;
    preferencesDeadline: Date | undefined;
    slots: Slot[] | undefined;

    constructor(
        courseName: string,
        algorithm: string | undefined, 
        preferencesDeadline: Date, 
        slots: Slot[]) {
          
        this.courseName = courseName;
        this.algorithm = algorithm;
        this.preferencesDeadline = preferencesDeadline;
        this.slots = slots
      }
}