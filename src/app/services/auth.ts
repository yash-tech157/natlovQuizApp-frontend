import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Temporary mock: in real app, this comes from the decoded JWT
  private userRole: string = 'PLAYER'; 

  setRole(role: string) {
    this.userRole = role;
  }

  getRole(): string {
    return this.userRole;
  }

  hasRole(role: string): boolean {
    return this.userRole === role;
  }
}