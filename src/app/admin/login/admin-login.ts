import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = new FormBuilder();

  protected readonly error = signal('');
  protected readonly form = this.fb.group({
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    const password = this.form.getRawValue().password!;
    if (this.authService.login(password)) {
      this.router.navigate(['/admin']);
    } else {
      this.error.set('Invalid password. Please try again.');
    }
  }
}
