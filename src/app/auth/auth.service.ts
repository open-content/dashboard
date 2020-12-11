import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base: string = `${environment.base}/auth`;

  constructor(
    private http: HttpClient,
    private session: SessionService,
    private router: Router
  ) { }

  email(email: string) {
    return this.http.post(`${this.base}/email`, {email});
  }

  workspace(workspace: string) {
    return this.http.post(`${this.base}/workspace`, {workspace});
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.base}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.base}/login`, credentials);
  }

  logout() {
    this.session.logout();
  }
}
