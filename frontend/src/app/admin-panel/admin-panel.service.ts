import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthRequest, AuthResponse } from '../models/admin-panel.model';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelService {
  backend = environment.apiBaseUrl;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.backend}/auth/login`, credentials)
      .pipe(
        catchError((error) => {
          if (error.status === 403 && error.error.isBlocked) {
            return throwError(error.error.message);
          }
          return this.handleError(error);
        }),
        map((response) => {
          console.log('Server Response:', response);
          if (response.token) {
            this.setAuthToken(response.token);
            this.setUserId(response.userId);

            const expirationDuration = response.expiresIn;
            this.autoLogout(expirationDuration);
          }
          return response;
        })
      );
  }

  signup(credentials: AuthRequest) {
    return this.http
      .post<AuthResponse>(`${this.backend}/auth/registration`, credentials)
      .pipe(
        catchError(this.handleError),
        map((response) => {
          console.log('REGG ' + response.token);
          if (response.token) {
            console.log('setting reg localstorages');

            this.setAuthToken(response.token);
            this.setUserId(response.userId);

            const expirationDuration = response.expiresIn;
            this.autoLogout(expirationDuration);
          }
          return response;
        })
      );
  }
  sendConfirmEmail(email: string) {
    return this.http.post<AuthResponse>(
      `${this.backend}/auth/send-confirm-email`,
      { email }
    );
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration * 2000);
  }

  logout() {
    console.log('getting called logout');

    this.removeAuthToken();
    this.router.navigate(['/main']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  setAuthToken(token: string): void {
    console.log('setter token ' + token);

    localStorage.setItem('user', token);
  }
  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  removeAuthToken(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('user');
    const authenticated = !!token;
    return of(authenticated);
  }
  // checkAuthStatus(): Observable<boolean> {
  //   const token = localStorage.getItem('token'); // Assume you're storing the token in local storage after login
  //   if (!token) {
  //     return of(false);
  //   }

  //   return this.http.get<boolean>(`${backend}/auth/check-auth-status`, {
  //     headers: { Authorization: token }
  //   }).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error && errorRes.error.message) {
      errorMessage = errorRes.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  getUser(): Observable<any> {
    return this.http.get(`${this.backend}/auth/user/${this.getUserId()}`);
  }
  getUsername(username: string): Observable<any> {
    return this.http.get(`${this.backend}/auth/username/${username}`);
  }
  checkUsernameAvailability(
    username: string
  ): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(
      `${this.backend}/auth/check-username/${username}`
    );
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.backend}/auth/forgot-password`, { email });
  }

  resetPassword(id: string, token: string, password: string): Observable<any> {
    return this.http.post(
      `${this.backend}/auth/reset-password/${id}/${token}`,
      { password }
    );
  }
  checkAdmin(): any {
    const userId = this.getUserId();

    if (userId === null) {
      return throwError(() => new Error('User ID is not available.'));
    }
    return this.http.get(`${this.backend}/auth/check-admin/${userId}`);
  }
  makeAdmin(username: string) {
    return this.http.post(`${this.backend}/auth/make-admin`, { username });
  }
  approval(email: string, password: string) {
    return this.http.post(`${this.backend}/auth/approval`, { email, password });
  }
}
