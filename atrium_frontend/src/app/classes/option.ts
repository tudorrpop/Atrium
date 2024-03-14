import { Course } from "./course";
import { Slot } from "./slot";


export class Option {

    optionid?: number | undefined 

    allocated: boolean | undefined;
    course: Course | undefined;
    preferredSlots: Slot[] | undefined;
    generalSlots: Slot[] | undefined;

    constructor(){}
}