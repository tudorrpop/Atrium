import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpProfessorComponent } from '../pop-up-professor/pop-up-professor.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  title = 'angular-mateiral';

  constructor(private dialogRef : MatDialog){}

  openCourseCreationDialiog(){
    this.dialogRef.open(PopUpProfessorComponent,{
      data : {
        name : 'Samuel'
      }
    });
  }

}
