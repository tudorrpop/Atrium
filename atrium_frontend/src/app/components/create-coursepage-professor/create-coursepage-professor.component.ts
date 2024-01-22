import { Component } from '@angular/core';
import { Course } from 'src/app/classes/course';
import { OnInit } from '@angular/core';
import { Slot } from 'src/app/classes/slot';
import { CourseService } from '../service/course.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpSlotComponent } from '../pop-up-slot/pop-up-slot.component';
import { DAY } from 'src/app/classes/day';
import { TIME } from 'src/app/classes/time';
import { SlotService } from '../service/slot.service';

@Component({
  selector: 'app-create-coursepage-professor',
  templateUrl: './create-coursepage-professor.component.html',
  styleUrls: ['./create-coursepage-professor.component.css']
})
export class CreateCoursepageProfessorComponent implements OnInit{

    visibility!: boolean;
    courseName!: String;
    preferencesDeadline!: Date;
    allocationDate!: Date;
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
      // console.log(day);
      // console.log(time);
      
      // const dialogRef = this.dialog.open(PopUpSlotComponent, {
      //   data: {
      //     dayID: day,
      //     timeID: time
      //   }
      // });
    }

    removeSlot(id: number): void {
      this.slots = this.slots.filter((s) => s.id !== id);
    }

    createCourse(){
      this.courseService.createCourse(new Course(this.visibility, this.courseName, 
        this.preferencesDeadline, this.allocationDate, this.slots))
    }

    openCourseCreationDialiog(){
      const dialogRef = this.dialog.open(PopUpSlotComponent);

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.addElement(this.slotService.getData());
          console.log(this.slotService.getData());
        } else {
          console.log('No element was added.');
        }
      });
    }

    goHome(){
      this.router.navigate(['/home']);
    }

}
