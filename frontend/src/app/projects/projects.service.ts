import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';
import { BusinessTypes } from '../models/businessTypes.model';

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
}
