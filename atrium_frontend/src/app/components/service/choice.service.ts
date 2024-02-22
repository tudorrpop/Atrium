import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Choice } from 'src/app/classes/choice';


@Injectable({
  providedIn: 'root'
})
export class ChoiceService {
  private baseUrl="http://localhost:8083";
  private readonly headers: HttpHeaders;

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { 

      // const accessToken = this.cookieService.get('yourAccessTokenCookieName');

      // if (!accessToken) {
      //   console.error('Access token not available.');
      // }
  
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${accessToken}`
      });
  }


  public getChoices(): Observable<Choice[]> {
    return this.httpClient.get<Choice[]>(`${this.baseUrl}/all`, { headers: this.headers });
  }

  public getChoice(courseid: number | undefined): Observable<Choice>{
    return this.httpClient.get<Choice>(`${this.baseUrl}/get`);
  }

  public dropCourse(courseid: number | undefined): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/drop`);
  }

  public enrollCourse(choice: Choice): Observable<Choice>{
    console.log(choice);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Choice>(`${this.baseUrl}/enroll`, choice);
  }
}
