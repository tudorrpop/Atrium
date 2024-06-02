import { Component } from '@angular/core';
import { Course } from 'src/app/classes/course';
import { Router } from '@angular/router'; 
import { CourseService } from '../service/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap} from '@angular/router'
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PopUpCourseDeleteComponent } from '../pop-up-course-delete/pop-up-course-delete.component';
import { DatePipe } from '@angular/common';
import { PopUpAllocateStudentsComponent } from '../pop-up-allocate-students/pop-up-allocate-students.component';
import { CourseDTO } from 'src/app/classes/coursedto';
import { Slot } from 'src/app/classes/slot';
import { Day } from 'src/app/classes/day';
import { Time } from 'src/app/classes/time';
import * as jspdf from 'jspdf';
import { Student } from 'src/app/classes/student';

@Component({
  selector: 'app-coursepage-professor',
  templateUrl: './coursepage-professor.component.html',
  styleUrls: ['./coursepage-professor.component.css']
})
export class CoursepageProfessorComponent {

  courseid: number | undefined;
  course: Course| undefined;

  courseDTO: CourseDTO | undefined;

  constructor(private courseService: CourseService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private dialog: MatDialog,
    public datepipe: DatePipe){}


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.courseid = +params.get('courseId')!;
        this.getCourse(this.courseid);
        console.log(this.course);
    });
  }

  goHome(){
    this.router.navigate([`/home`]);
  }

  private isSelectionProcessFinished(comparasingDate: Date | undefined): boolean{

      const currentDate: Date = new Date();

      let latest_date = this.datepipe.transform(this.course?.preferencesDeadline, 'yyyy-MM-dd');

      if (latest_date) {

        const parts: string[] = latest_date.split('-');
        
        const year: number = +parts[0]; 
        const month: number = +parts[1]; 
        const day: number = +parts[2];

        if ( (year < currentDate.getFullYear() || year == currentDate.getFullYear()) && 
        (month < currentDate.getMonth() + 1 || month == currentDate.getMonth() + 1) && 
        (day < currentDate.getDate()))
        return true;
       
    } 

    return false
  }

  allocateStudents(){

    const currentDate: Date = new Date();

    if (!this.isSelectionProcessFinished(this.course?.preferencesDeadline)) {

      const dialogRef = this.dialog.open(PopUpAllocateStudentsComponent);

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {

          this.courseService.allocateStudents(this.courseid).subscribe(
            (response: CourseDTO) => {
              this.courseDTO = response;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
          
        } else {
          console.log('No element was added.');
        }
      });

    } else {

      this.courseService.allocateStudents(this.courseid).subscribe(
        (response: CourseDTO) => {
          this.courseDTO = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

    }

  }

  deleteCourse(){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      courseid: this.courseid
    };

    const dialogRef = this.dialog.open(PopUpCourseDeleteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
      } else {
        console.log('No element was added.');
      }
    });
  }

  getCourse(courseid: number| undefined): void {
    
    this.courseService.getCourse(courseid).subscribe(
      (response: CourseDTO) => {
          this.courseDTO = response;
          console.log('NORMAL');
          console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public returnDayTimeGroup(id: number): string {
    
        const slots: Slot[] = this.courseDTO?.slots || [];

        for (let i : number = 0; i < slots.length; i++){
            if( slots.at(i)?.slotid == id){
              return  this.mapDayToString(slots.at(i)?.day) + ', ' + this.mapTimeToString(slots.at(i)?.time);
            }
        }

    return "Slot not found";
}


public downloadOutline(): void {
  const doc = new jspdf.jsPDF();
  let yOffset = 10;

  doc.setFontSize(30).setFont('Times New Roman','bold');
  doc.text(`Course: ${this.courseDTO?.courseName}`, 10, yOffset);
  doc.setFontSize(20).setFont('Times New Roman','normal');
  doc.text(`Teaching professor: ${this.courseDTO?.professor?.name}`, 10, yOffset + 10);
  doc.text(`Professor contact email: ${this.courseDTO?.professor?.email}`, 10, yOffset + 20);

  const groups = this.courseDTO?.groups;

  if (groups) {
      for (const [key, studentArray] of Object.entries(groups)) {
          doc.setFontSize(15).setFont('Times New Roman', 'normal');
          doc.text(`Slot: ${this.returnDayTimeGroup(parseInt(key, 10))}`, 10, yOffset + 40);
          doc.text(`Assigned Students: `, 10, yOffset + 50);
          // Increment yOffset for each group
          yOffset += 60;
          
          studentArray.forEach((student: Student) => {
              doc.setFontSize(10).setFont('Times New Roman', 'normal');
              doc.text(`${student.name}`, 10, yOffset);
              // Increment yOffset for each student
              yOffset += 10;
          });
      }
  } else {
      console.log("groups is undefined");
  }

  doc.save(`${this.courseDTO?.courseName}-allocation.pdf`);
}




public getAlgorithm(algorithm: string | undefined): string{

  console.log(algorithm);
  switch (algorithm) {
    case 'STANDARD_ALGORITHM':
      return 'Standard Algorithm';
    case 'GALE_SHAPLEY_ALGORITHM':
      return 'Gale Shapley Algorithm';
    default:
      return '';
  }
}




private mapDayToString(day: Day | undefined): string {
  switch (day) {
    case Day.MONDAY:
      return 'Monday';
    case Day.TUESDAY:
      return 'Tuesday';
    case Day.WEDNESDAY:
      return 'Wednesday';
    case Day.THURSDAY:
      return 'Thursday';
    case Day.FRIDAY:
      return 'Friday';
    default:
      return '';
  }
}

private mapTimeToString(time: Time | undefined): string {
  switch (time) {
    case Time.TIME_08_10:
      return '08:00 - 10:00';
    case Time.TIME_10_12:
      return '10:00 - 12:00';
    case Time.TIME_12_14:
      return '12:00 - 14:00';
    case Time.TIME_14_16:
      return '14:00 - 16:00';
    case Time.TIME_16_18:
      return '16:00 - 18:00';
    case Time.TIME_18_20:
      return '18:00 - 20:00';
    default:
      return '';
  }
}



}
