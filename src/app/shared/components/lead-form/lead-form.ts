import { Component, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeadService } from '../../../core/services/lead.service';

@Component({
  selector: 'app-lead-form',
  imports: [ReactiveFormsModule],
  templateUrl: './lead-form.html',
  styleUrl: './lead-form.css',
})
export class LeadForm {
  readonly source = input.required<'home' | 'contact'>();
  readonly compact = input(false);
  readonly title = input('Start Your Project');
  readonly subtitle = input('Tell us about your vision and we\'ll respond within 24 hours.');

  protected readonly submitted = signal(false);
  protected readonly submitting = signal(false);

  private readonly fb = new FormBuilder();

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    projectDetails: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private readonly leadService: LeadService) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const value = this.form.getRawValue();

    this.leadService.submitLead({
      name: value.name!,
      email: value.email!,
      phone: value.phone || undefined,
      projectDetails: value.projectDetails!,
      source: this.source(),
    });

    this.submitting.set(false);
    this.submitted.set(true);
    this.form.reset();
  }

  resetForm(): void {
    this.submitting.set(false);
    this.submitted.set(false);
    this.form.reset();
  }
}
