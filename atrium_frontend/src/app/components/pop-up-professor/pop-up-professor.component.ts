import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Router } from '@angular/router';
import { Course } from '../../classes/course';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-professor',
  templateUrl: './pop-up-professor.component.html',
  styleUrls: ['./pop-up-professor.component.css']
})
export class PopUpProfessorComponent implements OnInit{

  course:Course = new Course();
  selectedDate!: Date;

  constructor(private courseService: CourseService, private dialog: MatDialog, private router: Router){}

  ngOnInit(): void{
  }

  saveChanges() {
    console.log(this.course);
    this.courseService.createCourse(this.course)
      .subscribe(data => {
        this.dialog.closeAll();
    },  error=>alert("Sorry, registration failed!"));
  }
}
