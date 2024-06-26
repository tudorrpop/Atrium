import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl="http://localhost:8083";
  private readonly headers: HttpHeaders;

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService
  ) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${accessToken}`
    });
  }

  public getUser(email: string | undefined): Observable<User>{
    const params = new HttpParams()
        .set('email', email || '');
        
    return this.httpClient.get<User>(`http://localhost:8083/user`, { params });
  }

  public checkUser(email: string | undefined, name: string | undefined): Observable<User>{
    const params = new HttpParams()
        .set('email', email || '')
        .set('name', name || '');

    return this.httpClient.get<User>(`http://localhost:8083/checkUser`, { params });
  }

  public authenticateAdminUser(username: string, password: string): Observable<boolean>{
    const params = new HttpParams()
        .set('username', username || '')
        .set('password', password || '');
    
    return this.httpClient.get<boolean>(`http://localhost:8083/authenticateAdminUser`, { params });
  }

}
