import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Option } from 'src/app/classes/option';
import { Choice } from 'src/app/classes/choice';
import { ChoiceService } from '../service/choice.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Slot } from 'src/app/classes/slot';
import { CookieService } from 'ngx-cookie-service';
import { PopUpChoiceChangesComponent } from '../pop-up-choice-changes/pop-up-choice-changes.component';

@Component({
  selector: 'app-coursepage-student',
  templateUrl: './coursepage-student.component.html',
  styleUrls: ['./coursepage-student.component.css'],
})
export class CoursepageStudentComponent {

  choiceid: number | undefined;
  choice: Choice | undefined;

  modified: boolean = false;

  constructor(private choiceService: ChoiceService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private dialog: MatDialog,
    private cookieService: CookieService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.choiceid = +params.get('choiceid')!;
        this.getChoice(this.choiceid)
    });
  }

  preferredSlots: any[] = [];
  generalSlots: any[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    
    this.modified = true;
  }

  getChoice(choiceid: number| undefined): void {
    this.choiceService.getChoice(choiceid).subscribe(
      (response: Choice) => {
        this.choice = response;
        
        this.preferredSlots = this.choice.preferredSlots as Slot[]; 
        this.generalSlots = this.choice.generalSlots as Slot[]; 
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  goHome() {
    if (this.modified === true){
      const dialogRef = this.dialog.open(PopUpChoiceChangesComponent);

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.saveChanges();
        } else {
          console.log('RESULT FALSE');
        }
      });

    } else
      this.router.navigate(['/home-student']);
  }

  saveChanges() {
    if (this.choice) {
      this.choice.generalSlots = [...this.generalSlots];
    }

    if (this.choice) {
      this.choice.preferredSlots = [...this.preferredSlots];
    }
    
    console.log(this.choice);

    let email : string = this.cookieService.get('email');
    this.choiceService.saveChoice(this.choice, email).subscribe(
      (response: Choice) => {

        this.choice = response;
        this.modified = false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  dropCourse() {
    let email : string = this.cookieService.get('email');
    this.choiceService.dropCourse(this.choiceid, email).subscribe(
      () => {
        this.router.navigate([`/home-student`]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
