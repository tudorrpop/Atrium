import { Component } from '@angular/core';
import { RequestHelper } from 'src/app/helpers/RequestHelper';
import { AuthService } from '../service/auth-service';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
Router

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  user: User = new User();

  constructor(private authService: AuthService,
    private router: Router) {}

  
  async login(): Promise<void> {
    try {
      await this.authService.initializeMsal();
      await this.authService.login();

      await this.authService.acquireToken();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }

  goAdmin(): void{
    this.router.navigate(['./authenticationadmin']);
  }
}
