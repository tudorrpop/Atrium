// course.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Course } from 'src/app/classes/course';
import { AuthService } from './auth-service';
import { CookieService } from 'ngx-cookie-service';
import { CourseDTO } from 'src/app/classes/coursedto';

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


  public getCourses(email: string): Observable<Course[]> {
    const params = new HttpParams()
        .set('email', email || '');
        
    return this.httpClient.get<Course[]>(`${this.baseUrl}/all`, { headers: this.headers, params });
  }

  public getCourse(courseid: number | undefined): Observable<CourseDTO>{
    return this.httpClient.get<CourseDTO>(`http://localhost:8083/course/${courseid}`);
  }

  public deleteCourse(courseid: number | undefined): Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:8083/delete/${courseid}`);
  }

  public createCourse(course: Course, email: string): Observable<Course>{
    console.log(course);

    const params = new HttpParams()
        .set('email', email || '');

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Course>('http://localhost:8083/create', course, {headers, params});
  }

  public allocateStudents(courseid: number | undefined): Observable<CourseDTO>{

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<CourseDTO>(`http://localhost:8083/allocate/${courseid}`, null, {headers});
  }

}
