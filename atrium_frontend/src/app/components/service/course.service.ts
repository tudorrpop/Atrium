// course.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Course } from 'src/app/classes/course';
import { AuthService } from './auth-service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})

export class CourseService {

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


  public getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.baseUrl}/all`, { headers: this.headers });
  }

  public getCourse(courseid: number | undefined): Observable<Course>{
    return this.httpClient.get<Course>(`http://localhost:8083/course/${courseid}`);
  }

  public deleteCourse(courseid: number | undefined): Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:8083/delete/${courseid}`);
  }

  public createCourse(course: Course): Observable<Course>{
    console.log(course);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Course>('http://localhost:8083/create', course, {headers});
  }

}
