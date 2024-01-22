import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SlotService } from '../service/slot.service';
import { DAY } from 'src/app/classes/day';
import { TIME } from 'src/app/classes/time';
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
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any){
    this.dayID = data?.dayID + 1 || null;
    this.timeID = data?.timeID + 1 || null;
  }

  ngOnInit(): void{
  }

    createSlot(): void {
      const dayS: DAY | null = this.getDayEnumValue(this.dayID);
      const timeS: TIME | null = this.getTimeEnumValue(this.timeID);


      const slot = {
        id: Math.random(), 
        day: dayS,
        time: timeS,
        capacity: this.capacityS
      };

      this.slotService.setData(new Slot(Math.random(), 
      this.getDayEnumValue(this.dayID), 
      this.getTimeEnumValue(this.timeID), this.capacityS));
      
      this.dialog.close(true);
    }

  getDayEnumValue(id: number | null): DAY {
    switch (id) {
      case 1: return DAY.MONDAY;
      case 2: return DAY.TUESDAY;
      case 3: return DAY.WEDNESDAY;
      case 4: return DAY.THURSDAY;
      case 5: return DAY.FRIDAY;
  
      default: return DAY.MONDAY;
    }
  }


  getTimeEnumValue(id: number | null): TIME {
    switch (id) {
      case 1: return TIME.TIME_08_10;
      case 2: return TIME.TIME_10_12;
      case 3: return TIME.TIME_12_14;
      case 4: return TIME.TIME_14_16;
      case 5: return TIME.TIME_16_18;
      case 6: return TIME.TIME_18_20;
      
      default: return TIME.TIME_08_10;
    }
  }
}
