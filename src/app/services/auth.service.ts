import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userRole: string | null = null;
  private userId: number | null = null;

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get('http://localhost:8080/api/auth/user', { withCredentials: true }).pipe(
      tap((user: any) => {
        if (user) {
          this.userRole = user.role;
          this.userId = user.id;
        }
      })
    );
  }

  getRole() { return this.userRole; }
  getUserId() { return this.userId; }
}