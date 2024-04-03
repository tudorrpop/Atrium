import { Group } from "./group";
import { Professor } from "./professor";
import { Slot } from "./slot";
import { Student } from "./student";
import { User } from "./user";
import * as moment from 'moment';

export class Course {

    courseid?: number | undefined 
    
    algorithm: string | undefined;
    courseName: string | undefined;
    preferencesDeadline: Date | undefined;
    slots: Slot[] | undefined;

    professor: Professor | undefined;
    finalized: boolean | undefined;
    groups: Group[] | undefined;

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


    public getcurrentDate(): Date | undefined{
      return this.preferencesDeadline
    }
}