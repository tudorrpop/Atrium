// course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/classes/course';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl="http://localhost:8083/create";

  constructor(private httpClient: HttpClient) { }

  public createCourse(course: Course): Observable<Course> {
    console.log(course);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Course>(`${this.baseUrl}`, course, { headers });
  }
}
