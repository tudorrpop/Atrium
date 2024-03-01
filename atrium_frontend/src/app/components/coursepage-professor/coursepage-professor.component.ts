import { Component } from '@angular/core';
import { Course } from 'src/app/classes/course';
import { Router } from '@angular/router'; 
import { CourseService } from '../service/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap} from '@angular/router'
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PopUpCourseDeleteComponent } from '../pop-up-course-delete/pop-up-course-delete.component';

@Component({
  selector: 'app-coursepage-professor',
  templateUrl: './coursepage-professor.component.html',
  styleUrls: ['./coursepage-professor.component.css']
})
export class CoursepageProfessorComponent {

  courseid: number | undefined;
  course: Course| undefined;

  constructor(private courseService: CourseService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private dialog: MatDialog){}


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.courseid = +params.get('courseId')!;
        this.getCourse(this.courseid);
    });
  }

  goHome(){
    this.router.navigate([`/home`]);
  }

  allocateStudents(){

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
      (response: Course) => {
        this.course = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



}
