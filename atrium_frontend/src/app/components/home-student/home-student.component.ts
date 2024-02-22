import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Choice } from 'src/app/classes/choice';
import { CourseService } from '../service/course.service';
import { ChoiceService } from '../service/choice.service';
import { AuthService } from '../service/auth-service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { PopUpCourseEnrollmentComponent } from '../pop-up-course-enrollment/pop-up-course-enrollment.component';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent {


  choices: Choice[] = [];
  title = 'angular-mateiral';

  ngOnInit(): void {
    this.getChoices();
  }

  constructor(private router : Router, 
    private dialog: MatDialog, 
    private choiceService: ChoiceService, 
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

  getChoices(): void {

    // this.choiceService.getChoices().subscribe(
    //   (response: Choice[]) => {
    //     this.choices = response;
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
  }

  // Example: In a component or service
async logout(): Promise<void> {
  await this.authService.logout();
}

  openCourseEnrollmentDialiog(){
    const dialogRef = this.dialog.open(PopUpCourseEnrollmentComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {

      } else {
        console.log('No element was added.');
      }
    });
  }

}
