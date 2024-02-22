import { Component, OnInit} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Course } from 'src/app/classes/course';
import { CourseService } from '../service/course.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-pop-up-course-enrollment',
  templateUrl: './pop-up-course-enrollment.component.html',
  styleUrls: ['./pop-up-course-enrollment.component.css']
})
export class PopUpCourseEnrollmentComponent implements OnInit{

  courses: Course[] = [];

  constructor(private courseService: CourseService){

  }

  ngOnInit(): void{
    this.getCourses();
  }

  getCourses(): void{
    this.courseService.getCourses().subscribe(
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
      this.getCourses();
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

  


}
