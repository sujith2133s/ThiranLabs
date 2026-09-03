import { Component, inject, signal } from '@angular/core';
import { LeadService } from '../../core/services/lead.service';
import { Lead, LeadStatus } from '../../core/models/lead.model';

@Component({
  selector: 'app-admin-leads',
  templateUrl: './admin-leads.html',
  styleUrl: './admin-leads.css',
})
export class AdminLeads {
  private readonly leadService = inject(LeadService);

  protected readonly leads = this.leadService.allLeads;
  protected readonly selectedLead = signal<Lead | null>(null);
  protected readonly filterStatus = signal<LeadStatus | 'all'>('all');
  protected readonly notesDraft = signal('');

  protected filteredLeads() {
    const status = this.filterStatus();
    const all = this.leads();
    if (status === 'all') return all;
    return all.filter((l) => l.status === status);
  }

  protected selectLead(lead: Lead): void {
    this.selectedLead.set(lead);
    this.notesDraft.set(lead.adminNotes);
  }

  protected closeDetail(): void {
    this.selectedLead.set(null);
  }

  protected updateStatus(status: LeadStatus): void {
    const lead = this.selectedLead();
    if (!lead) return;
    this.leadService.updateStatus(lead.id, status);
    this.selectedLead.set({ ...lead, status });
  }

  protected saveNotes(): void {
    const lead = this.selectedLead();
    if (!lead) return;
    this.leadService.updateNotes(lead.id, this.notesDraft());
    this.selectedLead.set({ ...lead, adminNotes: this.notesDraft() });
  }

  protected deleteLead(id: string): void {
    if (confirm('Delete this lead permanently?')) {
      this.leadService.remove(id);
      this.selectedLead.set(null);
    }
  }

  protected setFilter(status: LeadStatus | 'all'): void {
    this.filterStatus.set(status);
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
