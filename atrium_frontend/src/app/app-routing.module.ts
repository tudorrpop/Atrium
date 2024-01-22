import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HomeComponent } from './components/home/home.component';
import { CreateCoursepageProfessorComponent } from './components/create-coursepage-professor/create-coursepage-professor.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-coursepage-professor', component: CreateCoursepageProfessorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }