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
import { Course } from 'src/app/classes/course';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent {

  choices: Choice[] = [];
  color: string = '';
  title = 'angular-mateiral';

  ngOnInit(): void {
    this.getChoices();
  }

  getBackgroundImage(): string {
    const randNumber: number = Math.floor(Math.random() * 8) + 1;
    const path: string = `../../../assets/test/${randNumber}.png`;
    return path;
  }

  constructor(private router : Router, 
    private dialog: MatDialog, 
    private choiceService: ChoiceService, 
    private authService: AuthService,
    private cookieService: CookieService){}

  openCourseCreationDialiog(){
    this.router.navigate(['/create-coursepage-professor']);
  }

  navigateToChoice(choiceid: number| undefined ){

    this.router.navigate(['/coursepage-student', choiceid]);

    // if (choiceid !== undefined) {

    //   if (this.choices.find(choice => choice.choiceid === choiceid)?.allocated === true)
    //     this.router.navigate(['/allocationstudent', choiceid]);
    //   else
    //     this.router.navigate(['/coursepage-student', choiceid]);
    // } else {
    //   console.error('CourseId is undefined');
    // }
  }

  getChoices(): void{
    let studentEmail: string = this.cookieService.get('email');

    this.choiceService.getChoices(studentEmail).subscribe(
      (response: Choice[]) => {
        this.choices = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openCourseEnrollmentDialiog(){
    const dialogRef = this.dialog.open(PopUpCourseEnrollmentComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        
      } else {
        this.getChoices();
        console.log('No element was added.');
      }
    });
  }

  goBack(): void{
    this.router.navigate(['/home-student']);
  }

}
