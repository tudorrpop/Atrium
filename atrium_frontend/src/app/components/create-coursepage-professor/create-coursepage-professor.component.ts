import { Component } from '@angular/core';
import { Course } from 'src/app/classes/course';
import { OnInit } from '@angular/core';
import { Slot } from 'src/app/classes/slot';
import { CourseService } from '../service/course.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpSlotComponent } from '../pop-up-slot/pop-up-slot.component';
import { SlotService } from '../service/slot.service';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Component({
  selector: 'app-create-coursepage-professor',
  templateUrl: './create-coursepage-professor.component.html',
  styleUrls: ['./create-coursepage-professor.component.css']
})
export class CreateCoursepageProfessorComponent implements OnInit{

    courseName!: string;
    algorithm: string | undefined;
    preferencesDeadline!: Date;
    slots: Slot[] = [];
  
    constructor(private courseService: CourseService, 
        private slotService: SlotService, 
        private dialog: MatDialog, 
        private router: Router,
        private cookieService: CookieService
      ){}
  
    ngOnInit(): void{ 
    }

    addElement(element: any): void {
      this.slots.push(element);
    }
    
    editSlot(id: number){

      console.log(id);
      console.log(this.slots);

      const index = this.slots.findIndex(item => item.slotid === id);
      const slot = this.slots[index];

      console.log(slot);

      const dialogRef = this.dialog.open(PopUpSlotComponent, {
        data: { slot }
      });
    

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          const index = this.slots.findIndex(item => item.slotid === this.slotService.getData().slotid);
          this.slots[index] = this.slotService.getData();

        } else {
          console.log('No element was added.');
        }
      });

    }

    removeSlot(id: number): void {
      this.slots = this.slots.filter((s) => s.slotid !== id);
    }

    createCourse(){
      const course = new Course(this.courseName, this.algorithm,
        moment(this.preferencesDeadline, "YYYY-M-D").toDate(), this.slots);

      let professorEmail: string = this.cookieService.get('email');

      console.log(course);
      console.log('Course object as JSON:', JSON.stringify(course, null, 2));
        
      this.courseService.createCourse(course, professorEmail)
        .subscribe(
          response => {
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Error:', error);
          }
      );

    }

    openCourseCreationDialiog(){
      const counter = this.slots.length;

      const dialogRef = this.dialog.open(PopUpSlotComponent, {
        data: { counter }
      });

      console.log(counter);

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.addElement(this.slotService.getData());
        } else {
          console.log('No element was added.');
        }
      });
    }

    goHome(){
      this.router.navigate(['/home']);
    }

}
