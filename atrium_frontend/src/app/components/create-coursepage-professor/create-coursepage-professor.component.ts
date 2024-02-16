import { Component } from '@angular/core';
import { Course } from 'src/app/classes/course';
import { OnInit } from '@angular/core';
import { Slot } from 'src/app/classes/slot';
import { CourseService } from '../service/course.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpSlotComponent } from '../pop-up-slot/pop-up-slot.component';
import { SlotService } from '../service/slot.service';

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
      ){}
  
    ngOnInit(): void{ 
    }

    addElement(element: any): void {
      this.slots.push(element);
    }
    
    editSlot(id: number){

      const index = this.slots.findIndex(item => item.id === id);
      const slot = this.slots[index];

      const dialogRef = this.dialog.open(PopUpSlotComponent, {
        data: { slot }
      });
    

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          const index = this.slots.findIndex(item => item.id === this.slotService.getData().id);
          this.slots[index] = this.slotService.getData();

        } else {
          console.log('No element was added.');
        }
      });

    }

    removeSlot(id: number): void {
      this.slots = this.slots.filter((s) => s.id !== id);
    }

    createCourse(){
      const course = new Course(this.courseName, this.algorithm,
        this.preferencesDeadline, this.slots);
      this.courseService.createCourse(course)
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
      const dialogRef = this.dialog.open(PopUpSlotComponent);

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
