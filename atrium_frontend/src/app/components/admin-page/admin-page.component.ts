import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/classes/course';
import { CourseService } from '../service/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopUpCourseDeleteComponent } from '../pop-up-course-delete/pop-up-course-delete.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})


export class AdminPageComponent {

  courses: Course[] = [];

  ngOnInit(): void {
    this.getCourses();
  }

  constructor(
    private router: Router,
    private courseService: CourseService, 
    private dialog: MatDialog
  ){ }

  getCourses() {

    this.courseService.getAdminCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public goDashboard(): void{
    this.router.navigate(['/adminauthentication']);
  }

  public deleteCourse(courseid: number | any): void{

    this.courseService.deleteCourse(courseid).subscribe(
      () => {
        this.getCourses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
}

}
