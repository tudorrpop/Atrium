import { Component } from '@angular/core';
import { Choice } from 'src/app/classes/choice';

@Component({
  selector: 'app-allocation-page-student',
  templateUrl: './allocation-page-student.component.html',
  styleUrls: ['./allocation-page-student.component.css']
})
export class AllocationPageStudentComponent {

  choice: Choice | undefined;


  dropCourse(): void{

  }

  goHome(): void{
    
  }

}
