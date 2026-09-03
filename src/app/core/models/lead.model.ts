export type LeadStatus = 'new' | 'contacted' | 'closed';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectDetails: string;
  source: 'home' | 'contact';
  status: LeadStatus;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  projectDetails: string;
  source: 'home' | 'contact';
}
