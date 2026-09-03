import { Injectable, signal, computed } from '@angular/core';
import { Lead, LeadFormData, LeadStatus } from '../models/lead.model';

const STORAGE_KEY = 'thiranlabs_leads';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly leads = signal<Lead[]>(this.load());

  readonly allLeads = computed(() =>
    [...this.leads()].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  );

  readonly newLeadCount = computed(
    () => this.leads().filter((l) => l.status === 'new').length
  );

  submitLead(data: LeadFormData): Lead {
    const now = new Date().toISOString();
    const lead: Lead = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim(),
      projectDetails: data.projectDetails.trim(),
      source: data.source,
      status: 'new',
      adminNotes: '',
      createdAt: now,
      updatedAt: now,
    };

    this.leads.update((list) => [lead, ...list]);
    this.save();
    return lead;
  }

  updateStatus(id: string, status: LeadStatus): void {
    this.leads.update((list) =>
      list.map((l) =>
        l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l
      )
    );
    this.save();
  }

  updateNotes(id: string, adminNotes: string): void {
    this.leads.update((list) =>
      list.map((l) =>
        l.id === id ? { ...l, adminNotes, updatedAt: new Date().toISOString() } : l
      )
    );
    this.save();
  }

  remove(id: string): void {
    this.leads.update((list) => list.filter((l) => l.id !== id));
    this.save();
  }

  getById(id: string): Lead | undefined {
    return this.leads().find((l) => l.id === id);
  }

  private load(): Lead[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      /* empty */
    }
    return [];
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.leads()));
  }
}
