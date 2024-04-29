import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root',
})
export class CallFormService {
  constructor(private http: HttpClient) {}
  backend = environment.apiBaseUrl;

  createApplication(applicationData: Application) {
    console.log(applicationData);

    return this.http.post<Application>(
      `${this.backend}/application/create`,
      applicationData
    );
  }
  getApplications() {
    return this.http.get<Application[]>(`${this.backend}/application`);
  }
}
