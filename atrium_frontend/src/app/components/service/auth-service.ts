import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { User } from 'src/app/classes/user';
import * as msal from '@azure/msal-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})



export class AuthService {

  private msalConfig: msal.Configuration = {
    auth: {
      clientId: '5edda4ee-b47b-42c4-af0d-88e57ae594aa',
      authority: 'https://login.microsoftonline.com/6bb41fe4-40a3-4a10-b6cd-38278e78b21a',
      redirectUri: 'http://localhost:4200/blank', 
    },
  };

  private msalInstance: msal.PublicClientApplication;

  user: User | undefined;

  constructor(private router: Router, 
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private userService: UserService) {

    this.msalInstance = new msal.PublicClientApplication(this.msalConfig);
  }

  async login(): Promise<void> {
    try {
      // Check if there is an ongoing interaction
      await this.msalInstance.handleRedirectPromise();
  
      const loginRequest: msal.PopupRequest = {
        scopes: ['user.read'],
      };
  
      const loginResponse = await this.msalInstance.loginPopup(loginRequest);
  
      // Check if the login was successful
      if (loginResponse && loginResponse.account) {
        // Set the active account
        this.msalInstance.setActiveAccount(loginResponse.account);

        this.cookieService.set('name', this.msalInstance.getActiveAccount()?.name ?? '- no name -');
        this.cookieService.set('email', this.msalInstance.getActiveAccount()?.username ?? '- no email -');


        let role: string;

        this.userService.checkUser(this.msalInstance.getActiveAccount()?.username, this.msalInstance.getActiveAccount()?.name)
          .pipe(
            tap(data => {
              role = data.role;

              if (role === 'Student') {
                this.router.navigate(['/home-student']);
              } else {
                this.router.navigate(['/home']);
              }
            })
          )
          .subscribe();
        
        
      } else {
        console.warn('Unexpected login response:', loginResponse);
      }
    } catch (error) {
      if (error instanceof msal.BrowserAuthError && error.errorCode === 'interaction_in_progress') {
        console.log('Interaction is already in progress.');
        return;
      }
  
      console.error('Authentication error:', error);
    }

  }
  
  async initializeMsal(): Promise<void> {
    await this.msalInstance.initialize();
  }

  async acquireToken(): Promise<void> {
    try {
      // Check if there is an active account
      const activeAccount = this.msalInstance.getActiveAccount();
  
      if (!activeAccount) {
        console.log('No active account. Please log in.');
        return;
      }
  
      // Acquire token silently
      const tokenRequest: msal.SilentRequest = {
        scopes: ['user.read'],
        account: activeAccount,
      };
  
      const tokenResponse = await this.msalInstance.acquireTokenSilent(tokenRequest);    
      this.cookieService.set('accessToken', tokenResponse.accessToken);
  
    } catch (error) {
      console.error('Token acquisition error:', error);
    }
  }

  async logout(): Promise<void> {
    try {

      await this.msalInstance.initialize();
  
      // Prepare the logout request
      const logoutRequest: msal.EndSessionRequest = {
        account: this.msalInstance.getActiveAccount(),
        postLogoutRedirectUri: 'http://localhost:4200/authentication', // Redirect to home after logout
      };
  
      // Initiate the logout
      await this.msalInstance.logout(logoutRequest);
      this.router.navigate(['/authentication']);

    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  async isLoggedIn(): Promise<boolean> {
    await this.msalInstance.initialize(); 
    return this.msalInstance.getActiveAccount() !== null;
  }

}
