import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-allocate-students',
  templateUrl: './pop-up-allocate-students.component.html',
  styleUrls: ['./pop-up-allocate-students.component.css']
})
export class PopUpAllocateStudentsComponent {

  constructor(private dialog: MatDialogRef<PopUpAllocateStudentsComponent>){

  }

  confirm(){
    this.dialog.close(true);
  }

  cancel(){
    this.dialog.close(false);
  }

}
