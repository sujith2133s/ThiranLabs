import { Injectable, signal } from '@angular/core';

const AUTH_KEY = 'thiranlabs_admin_auth';
const PASSWORD_KEY = 'thiranlabs_admin_password';
const DEFAULT_PASSWORD = 'admin123';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authenticated = signal(this.checkSession());

  readonly isAuthenticated = this.authenticated.asReadonly();

  login(password: string): boolean {
    const stored = this.getStoredPassword();
    if (password === stored) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      this.authenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
    this.authenticated.set(false);
  }

  changePassword(current: string, newPassword: string): boolean {
    if (current !== this.getStoredPassword() || newPassword.length < 6) {
      return false;
    }
    localStorage.setItem(PASSWORD_KEY, newPassword);
    return true;
  }

  private getStoredPassword(): string {
    return localStorage.getItem(PASSWORD_KEY) ?? DEFAULT_PASSWORD;
  }

  private checkSession(): boolean {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }
}
