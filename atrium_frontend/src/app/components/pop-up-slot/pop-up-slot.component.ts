import { Component, OnInit, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SlotService } from '../service/slot.service';
import { Day } from 'src/app/classes/day';
import { Time } from 'src/app/classes/time';
import { Slot } from 'src/app/classes/slot';

@Component({
  selector: 'app-pop-up-slot',
  templateUrl: './pop-up-slot.component.html',
  styleUrls: ['./pop-up-slot.component.css']
})
export class PopUpSlotComponent implements OnInit{


  slotid: number | undefined;
  dayID: number | null = null;
  timeID: number | null = null;
  capacityS!: number;

  counter!: number;

  constructor(private slotService: SlotService, 
    private dialog: MatDialogRef<PopUpSlotComponent>, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any){

      if (data) {
        if (data.slot instanceof Slot) {
          this.slotid = data.slot.id;
          this.dayID = this.getNumberDayValue(data.slot.day);
          this.timeID = this.getNumberTimeValue(data.slot.time);
          this.capacityS = data.slot.capacity;
        } else if (typeof data.counter === 'number') {
          this.counter = data.counter;
        }
      }
      
  }

  ngOnInit(): void{
  }

  createSlot(): void {

    if (this.slotid !== undefined){

      const dayS: Day | null = this.getDayEnumValue(this.dayID);
      const timeS: Time | null = this.getTimeEnumValue(this.timeID);

      const slot = {
        id: this.slotid, 
        day: dayS,
        time: timeS,
        capacity: this.capacityS
      };

      this.slotService.setData(slot);

    }else{
      const dayS: Day | null = this.getDayEnumValue(this.dayID);
      const timeS: Time | null = this.getTimeEnumValue(this.timeID);

      const slot = {
        id: Math.random(), 
        day: dayS,
        time: timeS,
        capacity: this.capacityS
      };

      this.slotService.setData(slot);
    }
    
    this.dialog.close(true);
  }
    
  // Day to Number

  getNumberDayValue(day: Day): number {
    switch (day) {
      case Day.MONDAY: return 1;
      case Day.TUESDAY: return 2;
      case Day.WEDNESDAY: return 3;
      case Day.THURSDAY: return 4;
      case Day.FRIDAY: return 5;
      default: throw new Error('Invalid day enum value.');
    }
  }

  getNumberTimeValue(time: Time): number {
    switch (time) {
      case Time.TIME_08_10: return 1;
      case Time.TIME_10_12: return 2;
      case Time.TIME_12_14: return 3;
      case Time.TIME_14_16: return 4;
      case Time.TIME_16_18: return 5;
      case Time.TIME_18_20: return 6;
      default: throw new Error('Invalid time enum value.');
    }
  }


  // Number to Day

  getDayEnumValue(id: number | null): Day {
    switch (id) {
      case 1: return Day.MONDAY;
      case 2: return Day.TUESDAY;
      case 3: return Day.WEDNESDAY;
      case 4: return Day.THURSDAY;
      case 5: return Day.FRIDAY;
    }

    throw new Error('Invalid option for day selection of the slots.');
  }


  getTimeEnumValue(id: number | null): Time {
    switch (id) {
      case 1: return Time.TIME_08_10;
      case 2: return Time.TIME_10_12;
      case 3: return Time.TIME_12_14;
      case 4: return Time.TIME_14_16;
      case 5: return Time.TIME_16_18;
      case 6: return Time.TIME_18_20;
    }

    throw new Error('Invalid option for time selection of the slots.');
  }
}
