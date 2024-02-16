import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HomeComponent } from './components/home/home.component';
import { CreateCoursepageProfessorComponent } from './components/create-coursepage-professor/create-coursepage-professor.component';
import { CoursepageProfessorComponent } from './components/coursepage-professor/coursepage-professor.component';
import { PopUpCourseDeleteComponent } from './components/pop-up-course-delete/pop-up-course-delete.component';
import { CoursepageStudentComponent } from './components/coursepage-student/coursepage-student.component'; 
import { MsalGuard } from './msal.guard';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent},
  { path: 'coursepage-professor/:courseId', component: CoursepageProfessorComponent },
  { path: 'coursepage-student', component: CoursepageStudentComponent },
  { path: 'pop-up-delete/:courseId', component: PopUpCourseDeleteComponent },
  { path: 'create-coursepage-professor', component: CreateCoursepageProfessorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }