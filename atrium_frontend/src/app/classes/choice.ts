import { Course } from "./course";
import { Slot } from "./slot";

export class Choice {

    choiceid?: number | undefined 
  
    course: Course | undefined;
    
    preferredSlots: Slot[] | undefined;
    generalSlots: Slot[] | undefined;
}