import { Component } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent {

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  
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
