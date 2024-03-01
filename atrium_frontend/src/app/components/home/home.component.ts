import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpCourseEnrollmentComponent } from '../pop-up-course-enrollment/pop-up-course-enrollment.component';
import { Course } from 'src/app/classes/course';
import { CourseService } from '../service/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../service/auth-service';
import { User } from 'src/app/classes/user';
import { Student } from 'src/app/classes/student';
import { Professor } from 'src/app/classes/professor';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  courses: Course[] = [];
  title = 'angular-mateiral';

  ngOnInit(): void {
    this.getCourses();
  }
  
  constructor(private router : Router, 
    private dialog: MatDialog, 
    private courseService: CourseService, 
    private authService: AuthService,
    private cookieService: CookieService){}

  openCourseCreationDialiog(){
    this.router.navigate(['/create-coursepage-professor']);
  }

  navigateToCourse(courseid: number| undefined ){
    if (courseid !== undefined) {
      this.router.navigate(['/coursepage-professor', courseid]);
    } else {
      // Handle the case where courseId is undefined
      console.error('CourseId is undefined');
    }
  }

  getCourses(): void {

    let professorEmail: string = this.cookieService.get('email');

    this.courseService.getCourses(professorEmail).subscribe(
      (response: Course[]) => {
        this.courses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
