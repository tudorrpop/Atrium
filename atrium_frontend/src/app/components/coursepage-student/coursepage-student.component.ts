import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Option } from 'src/app/classes/option';

@Component({
  selector: 'app-coursepage-student',
  templateUrl: './coursepage-student.component.html',
  styleUrls: ['./coursepage-student.component.css'],
})
export class CoursepageStudentComponent {

  option: Option | undefined;

  todo: any[] = [];
  done: any[] = ['Thursday - 18:00', 'Friday - 10:00', 'Monday - 14:00', 'Tuesday - 18:00', 'Wednesday - 12:00', 'Thursday - 08:00'];

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

    console.log(this.todo);
    console.log(this.done);
  }
  

  goHome() {
    // Implement the goHome function logic here
  }

  allocateStudents() {
    // Implement the allocateStudents function logic here
  }

  deleteCourse() {
    // Implement the deleteCourse function logic here
  }
}
