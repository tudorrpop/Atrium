import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HomeComponent } from './components/home/home.component';

import { RouterModule } from '@angular/router';
import { PopUpSlotComponent } from './components/pop-up-slot/pop-up-slot.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoursepageProfessorComponent } from './components/coursepage-professor/coursepage-professor.component';
import { CreateCoursepageProfessorComponent } from './components/create-coursepage-professor/create-coursepage-professor.component';
import { PopUpCourseEnrollmentComponent } from './components/pop-up-course-enrollment/pop-up-course-enrollment.component';
import { PopUpCourseDeleteComponent } from './components/pop-up-course-delete/pop-up-course-delete.component';
import { CoursepageStudentComponent } from './components/coursepage-student/coursepage-student.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MsalModule } from '@azure/msal-angular';
import { ProfilepageComponent } from './components/profilepage/profilepage.component';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { AllocationPageStudentComponent } from './components/allocation-page-student/allocation-page-student.component';
import { PopUpChoiceChangesComponent } from './components/pop-up-choice-changes/pop-up-choice-changes.component';
import { PopUpAllocateStudentsComponent } from './components/pop-up-allocate-students/pop-up-allocate-students.component';
import { DatePipe } from '@angular/common';
import { AuthenticationAdminComponent } from './components/authentication-admin/authentication-admin.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';


@NgModule({

  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    PopUpSlotComponent,
    CoursepageProfessorComponent,
    CreateCoursepageProfessorComponent,
    PopUpCourseEnrollmentComponent,
    PopUpCourseDeleteComponent,
    CoursepageStudentComponent,
    NavbarComponent,
    ProfilepageComponent,
    HomeStudentComponent,
    AllocationPageStudentComponent,
    PopUpChoiceChangesComponent,
    PopUpAllocateStudentsComponent,
    AuthenticationAdminComponent,
    AdminPageComponent
  ],

  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    BrowserModule,
    MsalModule
  ],

  providers: [ 
    DatePipe,
  ],

  bootstrap: [AppComponent]
})



export class AppModule { 
}
