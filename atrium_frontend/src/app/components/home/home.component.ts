import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  title = 'angular-mateiral';

  constructor(private router : Router){}

  openCourseCreationDialiog(){
    this.router.navigate(['/create-coursepage-professor']);
  }

}
