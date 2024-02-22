import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HomeComponent } from './components/home/home.component';
import { CreateCoursepageProfessorComponent } from './components/create-coursepage-professor/create-coursepage-professor.component';
import { CoursepageProfessorComponent } from './components/coursepage-professor/coursepage-professor.component';
import { PopUpCourseDeleteComponent } from './components/pop-up-course-delete/pop-up-course-delete.component';
import { CoursepageStudentComponent } from './components/coursepage-student/coursepage-student.component'; 
import { MsalGuard } from './msal.guard';
import { ProfilepageComponent } from './components/profilepage/profilepage.component';
import { PopUpCourseEnrollmentComponent } from './components/pop-up-course-enrollment/pop-up-course-enrollment.component';
import { HomeStudentComponent } from './components/home-student/home-student.component';

const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent, canActivate: [MsalGuard]},
  { path: 'home-student', component: HomeStudentComponent, canActivate: [MsalGuard]},
  { path: 'coursepage-professor/:courseId', component: CoursepageProfessorComponent },
  { path: 'coursepage-student', component: CoursepageStudentComponent },
  { path: 'pop-up-delete/:courseId', component: PopUpCourseDeleteComponent },
  { path: 'create-coursepage-professor', component: CreateCoursepageProfessorComponent },
  { path: 'profilepage', component: ProfilepageComponent},
  { path: 'enrollmentpopup', component: PopUpCourseEnrollmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }