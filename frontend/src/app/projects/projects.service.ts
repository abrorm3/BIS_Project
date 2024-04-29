import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';
import { BusinessTypes } from '../models/businessTypes.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}
  backend = environment.apiBaseUrl;

  fetchProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.backend}/api/booths/get`);
  }
  fetchProjectDetails(id: string): Observable<Project> {
    console.log(id);

    return this.http.get<Project>(`${this.backend}/api/booths/getOne/${id}`);
  }
  fetchBusinessTypes(): Observable<BusinessTypes[]> {
    return this.http.get<BusinessTypes[]>(
      `${this.backend}/api/booths/getBusinessTypes`
    );
  }
  createProject(project: Project) {
    console.log('Sending request:', project);
    return this.http
      .post(`${this.backend}/api/booths/createProject`, project)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }
  deleteProject(projectId: string | undefined) {
    return this.http.delete(
      `${this.backend}/api/booths/deleteProject/${projectId}`
    );
  }
}
