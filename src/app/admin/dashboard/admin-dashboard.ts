import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LeadService } from '../../core/services/lead.service';
import { ServicesService } from '../../core/services/services.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  private readonly leadService = inject(LeadService);
  private readonly servicesService = inject(ServicesService);

  protected readonly leads = this.leadService.allLeads;
  protected readonly newLeadCount = this.leadService.newLeadCount;
  protected readonly serviceCount = this.servicesService.allServices;

  protected recentLeads() {
    return this.leads().slice(0, 5);
  }

  protected formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
