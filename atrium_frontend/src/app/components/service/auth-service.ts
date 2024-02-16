import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';
import * as msal from '@azure/msal-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})



export class AuthService {
  private msalConfig: msal.Configuration = {
    auth: {
      clientId: '5edda4ee-b47b-42c4-af0d-88e57ae594aa',
      authority: 'https://login.microsoftonline.com/6bb41fe4-40a3-4a10-b6cd-38278e78b21a',
      redirectUri: 'http://localhost:4200/home',
    },
  };

  private msalInstance: msal.PublicClientApplication;

  constructor(private router: Router) {
    this.msalInstance = new msal.PublicClientApplication(this.msalConfig);
  }

  async login(): Promise<void> {
    try {
      // Check if there is an ongoing interaction
      await this.msalInstance.handleRedirectPromise();
      console.log('No ongoing interaction. Proceed with login.');
  
      const loginRequest: msal.PopupRequest = {
        scopes: ['user.read'],
      };
  
      // Initiate the login popup
      const loginResponse = await this.msalInstance.loginPopup(loginRequest);
      console.log('Login Response', loginResponse);
  
      // Check if the login was successful
      if (loginResponse && loginResponse.account) {
        // Set the active account
        this.msalInstance.setActiveAccount(loginResponse.account);
  
        // Redirect to home page or perform other post-login actions
        this.router.navigate(['/home']);
      } else {
        // Handle other scenarios or errors after login
        console.warn('Unexpected login response:', loginResponse);
      }
    } catch (error) {
      // Handle errors, including interaction in progress
      if (error instanceof msal.BrowserAuthError && error.errorCode === 'interaction_in_progress') {
        console.log('Interaction is already in progress.');
        return;
      }
  
      console.error('Authentication error:', error);
      // Handle other authentication errors as needed
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
      console.log('Token Response', tokenResponse);
  
      // Handle token response as needed
    } catch (error) {
      console.error('Token acquisition error:', error);
      // Handle token acquisition error as needed
    }
  }

  async logout(): Promise<void> {
    try {
      // Ensure that MSAL is initialized
      await this.msalInstance.initialize();
  
      // Prepare the logout request
      const logoutRequest: msal.EndSessionRequest = {
        account: this.msalInstance.getActiveAccount(),
        postLogoutRedirectUri: 'http://localhost:4200/authentication', // Redirect to home after logout
      };
  
      // Initiate the logout
      await this.msalInstance.logout(logoutRequest);
  
      // Navigate to the home page after logout
      this.router.navigate(['/authentication']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  



  isLoggedIn(): boolean{
    if (this.msalInstance.getActiveAccount() == null) {
      console.log('not logged in!')
      return false;
    }

    return true;
  }
}