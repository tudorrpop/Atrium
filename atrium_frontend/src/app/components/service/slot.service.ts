import { Injectable } from '@angular/core';
import { Slot } from 'src/app/classes/slot';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private data!: Slot;

  getData(): Slot {
    return this.data;
  }

  setData(element: Slot ): void {
    this.data = element;
  }
}
