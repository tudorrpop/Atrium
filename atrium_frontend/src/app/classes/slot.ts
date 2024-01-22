import { DAY } from "./day";
import { TIME } from "./time";


export class Slot {
    id: number ;
    day: DAY ;
    time: TIME ;
    capacity: number;

    constructor(id: number, day: DAY, time: TIME, capacity: number) {
        this.id = id;
        this.day = day;
        this.time = time;
        this.capacity = capacity;
      }
}