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
import { BlankPageComponent } from 'src/blank';
import { AllocationPageStudentComponent } from './components/allocation-page-student/allocation-page-student.component';
import { AuthenticationAdminComponent } from './components/authentication-admin/authentication-admin.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const routes: Routes = [
  { path: 'blank', component: BlankPageComponent },

  
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent, canActivate: [MsalGuard]},
  { path: 'home-student', component: HomeStudentComponent, canActivate: [MsalGuard]},
  { path: 'coursepage-professor/:courseId', component: CoursepageProfessorComponent },
  { path: 'coursepage-student/:choiceid', component: CoursepageStudentComponent },
  { path: 'pop-up-delete/:courseId', component: PopUpCourseDeleteComponent },
  { path: 'create-coursepage-professor', component: CreateCoursepageProfessorComponent },
  { path: 'profile', component: ProfilepageComponent},
  { path: 'enrollmentpopup', component: PopUpCourseEnrollmentComponent},
  { path: 'allocationstudent', component: AllocationPageStudentComponent},
  { path: 'authenticationadmin', component: AuthenticationAdminComponent},
  { path: 'adminauthentication', component: AuthenticationAdminComponent},
  { path: 'adminpage', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }