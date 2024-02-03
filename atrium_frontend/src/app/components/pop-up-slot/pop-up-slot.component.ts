import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
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

  dayID: number | null = null;
  timeID: number | null = null;
  capacityS!: number;

  constructor(private slotService: SlotService, 
    private dialog: MatDialogRef<PopUpSlotComponent>, 
    private router: Router){

  }

  ngOnInit(): void{
  }

    createSlot(): void {
      const dayS: Day | null = this.getDayEnumValue(this.dayID);
      const timeS: Time | null = this.getTimeEnumValue(this.timeID);


      const slot = {
        id: Math.random(), 
        day: dayS,
        time: timeS,
        capacity: this.capacityS
      };

      this.slotService.setData(new Slot( 
      this.getDayEnumValue(this.dayID), 
      this.getTimeEnumValue(this.timeID), this.capacityS));
      
      this.dialog.close(true);
    }

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
