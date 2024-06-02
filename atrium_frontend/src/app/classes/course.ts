import { Professor } from "./professor";
import { Slot } from "./slot";

export class Course {

    courseid?: number | undefined 
    
    courseName: string | undefined;
    professor: Professor | undefined;

    algorithm: string | undefined;
    preferencesDeadline: Date | undefined;
    finalized: boolean | undefined;

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


