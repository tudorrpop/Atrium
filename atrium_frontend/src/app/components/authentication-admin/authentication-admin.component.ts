import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authentication-admin',
  templateUrl: './authentication-admin.component.html',
  styleUrls: ['./authentication-admin.component.css']
})
export class AuthenticationAdminComponent {

  constructor(
    private router: Router,
    private userService: UserService
  ){ }

  goMember(): void{
    this.router.navigate(['./authentication']);
  }

  onButtonPressed(username: string, password: string): void{
    const encodedPassword = btoa(password);

    this.userService.authenticateAdminUser(username, encodedPassword).subscribe(
      (response: boolean) => {
        if (response == true)
          this.router.navigate(['/adminpage']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
