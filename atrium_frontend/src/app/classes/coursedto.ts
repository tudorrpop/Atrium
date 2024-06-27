import { Professor } from "./professor";
import { Slot } from "./slot";
import { Student } from "./student";


export class CourseDTO {

    courseid?: number | undefined 
    
    algorithm: string | undefined;
    courseName: string | undefined;
    preferencesDeadline: Date | undefined;
    slots: Slot[] | undefined;

    professor: Professor | undefined;
    finalized: boolean | undefined;
    groups: Map<number, Student[]> | undefined;
}