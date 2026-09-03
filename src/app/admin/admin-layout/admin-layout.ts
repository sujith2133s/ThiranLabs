import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LeadService } from '../../core/services/lead.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private readonly authService = inject(AuthService);
  private readonly leadService = inject(LeadService);
  private readonly router = inject(Router);

  protected readonly newLeadCount = this.leadService.newLeadCount;

  protected readonly navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊', exact: true },
    { path: '/admin/content', label: 'Content', icon: '📝', exact: false },
    { path: '/admin/services', label: 'Services', icon: '🛠️', exact: false },
    { path: '/admin/leads', label: 'Leads', icon: '📬', exact: false },
  ];

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
