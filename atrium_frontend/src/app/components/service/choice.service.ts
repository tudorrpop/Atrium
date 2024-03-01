import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Choice } from 'src/app/classes/choice';
import { Course } from 'src/app/classes/course';


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


  public getChoices(email: string): Observable<Choice[]> {
    const params = new HttpParams()
        .set('email', email || '');

    return this.httpClient.get<Choice[]>(`${this.baseUrl}/choices`, { headers: this.headers , params});
  }

  public getCoursesToEnroll(email: string): Observable<Course[]> {
    const params = new HttpParams()
        .set('email', email || '');
        
    return this.httpClient.get<Course[]>(`${this.baseUrl}/courses`, { headers: this.headers, params});
  }

  public getChoice(choiceid: number | undefined): Observable<Choice>{
    return this.httpClient.get<Choice>(`http://localhost:8083/choice/${choiceid}`);
  }

  public dropCourse(courseid: number | undefined): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/drop`);
  }

  public enrollCourse(courseid: number, email: string): Observable<Choice>{
    const params = new HttpParams()
        .set('email', email || '');

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Choice>(`${this.baseUrl}/enroll`, courseid, { params });
  }

  public saveChoice(choice: Choice | undefined, email: string): Observable<Choice>{
    const params = new HttpParams()
        .set('email', email || '');

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Choice>(`${this.baseUrl}/save`, choice, { params });
  }
}
