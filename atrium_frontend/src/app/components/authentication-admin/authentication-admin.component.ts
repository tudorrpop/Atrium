import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication-admin',
  templateUrl: './authentication-admin.component.html',
  styleUrls: ['./authentication-admin.component.css']
})
export class AuthenticationAdminComponent {

  constructor(
    private router: Router
  ){ }

  goMember(): void{
    this.router.navigate(['./authentication']);
  }

  onButtonPressed(): void{
    
  }
}
