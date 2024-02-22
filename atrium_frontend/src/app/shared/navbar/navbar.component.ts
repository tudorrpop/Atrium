import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/components/service/auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  name: string | undefined;
  
  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router) {}

  ngOnInit(){
    this.name = this.cookieService.get('name') ?? undefined;

  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  goDashboard(): void{
    this.router.navigate(['/home-student']);
  }

  showProfile(): void{
    this.router.navigate(['/profilepage']);
  }
  
}
