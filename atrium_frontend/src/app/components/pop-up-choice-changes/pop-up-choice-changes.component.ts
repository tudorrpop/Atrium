import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-choice-changes',
  templateUrl: './pop-up-choice-changes.component.html',
  styleUrls: ['./pop-up-choice-changes.component.css']
})
export class PopUpChoiceChangesComponent {

  constructor(private router: Router,
    private dialog: MatDialogRef<PopUpChoiceChangesComponent>
    ){ }

  public cancel(): void{
    this.dialog.close(false);
  }

  public dismissChanges(): void{
    this.dialog.close(false);
    this.router.navigate([`/home-student`]);
  }

  public saveChanges(): void{
    this.dialog.close(true);
    this.router.navigate([`/home-student`]);
  }

}
