import { Component, OnInit} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Course } from 'src/app/classes/course';
import { CourseService } from '../service/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ChoiceService } from '../service/choice.service';


@Component({
  selector: 'app-pop-up-course-enrollment',
  templateUrl: './pop-up-course-enrollment.component.html',
  styleUrls: ['./pop-up-course-enrollment.component.css']
})
export class PopUpCourseEnrollmentComponent implements OnInit{

  courses: Course[] = [];
  enrolledCourses: number[] = [];

  constructor(private courseService: CourseService,
    private cookieService: CookieService,
    private choiceService: ChoiceService){

  }

  ngOnInit(): void{
    this.getCoursesToEnroll();
  }

  getCoursesToEnroll(): void {

    let studentEmail: string = this.cookieService.get('email');

    this.choiceService.getCoursesToEnroll(studentEmail).subscribe(
      (response: Course[]) => {
        this.courses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  searchCourses(key: string): void {
    if (!key) {
      this.getCoursesToEnroll();
      return;
    }
  
    const lowercaseKey = key.toLowerCase();
    
    const results: Course[] = this.courses.filter(course => 
      course && 
      course.courseName && 
      course.courseName.toLowerCase().includes(lowercaseKey)
    );
  
    this.courses = results;
  }

  public addCourse(courseid: number): void{

    this.enrolledCourses.push(courseid);

    let studentEmail: string = this.cookieService.get('email');

    this.choiceService.enrollCourse(courseid, studentEmail).subscribe(
      () => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }


  courseAttended(courseid: number): boolean{
      return this.enrolledCourses.includes(courseid);
  }

  


}
