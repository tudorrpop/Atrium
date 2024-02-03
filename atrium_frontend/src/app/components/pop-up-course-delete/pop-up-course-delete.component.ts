import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../service/course.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router'

@Component({
  selector: 'app-pop-up-course-delete',
  templateUrl: './pop-up-course-delete.component.html',
  styleUrls: ['./pop-up-course-delete.component.css']
})
export class PopUpCourseDeleteComponent {



  constructor(private dialog: MatDialogRef<PopUpCourseDeleteComponent>, 
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: { courseid: number },
    private router: Router){}

  confirm(){
    const courseid = this.data.courseid;
    this.courseService.deleteCourse(courseid).subscribe(
      () => {
        this.dialog.close(true);
        this.router.navigate([`/home`]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
  }

  cancel(){
    this.dialog.close(true);
  }

}
