import { Professor } from "./professor";
import { Slot } from "./slot";
import { User } from "./user";

export class Course {

    courseid?: number | undefined 
    
    algorithm: string | undefined;
    courseName: string | undefined;
    preferencesDeadline: Date | undefined;
    slots: Slot[] | undefined;

    professor: Professor | undefined;

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