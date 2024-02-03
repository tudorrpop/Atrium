import { Day } from "./day";
import { Time } from "./time";


export class Slot {
    id?: number ;
    
    day: Day ;
    time: Time ;
    capacity: number;

    constructor(day: Day, time: Time, capacity: number) {
        this.id = Math.random();
        this.day = day;
        this.time = time;
        this.capacity = capacity;
      }
}