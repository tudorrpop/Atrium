import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './components/service/auth-service';

@Injectable({
  providedIn: 'root'
})

export class MsalGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){

  }
  
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

      const isAuthenticated = await this.authService.isLoggedIn();

    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to the authentication page if not logged in
      return this.router.createUrlTree(['/authentication']);
    }
  }
  
}
