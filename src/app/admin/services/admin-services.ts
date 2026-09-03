import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../../core/services/services.service';
import { ServiceItem } from '../../core/models/service.model';

@Component({
  selector: 'app-admin-services',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-services.html',
  styleUrl: './admin-services.css',
})
export class AdminServices {
  private readonly servicesService = inject(ServicesService);
  private readonly fb = new FormBuilder();

  protected readonly services = this.servicesService.allServices;
  protected readonly editing = signal<ServiceItem | null>(null);
  protected readonly isCreating = signal(false);
  protected readonly featuresText = signal('');

  protected readonly form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    icon: ['palette'],
  });

  protected readonly iconOptions = [
    { value: 'palette', label: '🎨 Design' },
    { value: 'code', label: '💻 Code' },
    { value: 'rocket', label: '🚀 Rocket' },
    { value: 'refresh', label: '✨ Refresh' },
    { value: 'cart', label: '🛒 Cart' },
    { value: 'support', label: '🛡️ Support' },
  ];

  startCreate(): void {
    this.isCreating.set(true);
    this.editing.set(null);
    this.form.reset({ icon: 'palette' });
    this.featuresText.set('');
  }

  startEdit(service: ServiceItem): void {
    this.editing.set(service);
    this.isCreating.set(false);
    this.form.patchValue({
      title: service.title,
      description: service.description,
      icon: service.icon,
    });
    this.featuresText.set(service.features.join('\n'));
  }

  cancelEdit(): void {
    this.editing.set(null);
    this.isCreating.set(false);
    this.form.reset();
    this.featuresText.set('');
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const features = this.featuresText()
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    if (this.editing()) {
      this.servicesService.update(this.editing()!.id, {
        title: value.title!,
        description: value.description!,
        icon: value.icon!,
        features,
      });
    } else {
      this.servicesService.add({
        title: value.title!,
        description: value.description!,
        icon: value.icon!,
        features,
        order: this.services().length,
      });
    }

    this.cancelEdit();
  }

  deleteService(id: string): void {
    if (confirm('Delete this service?')) {
      this.servicesService.remove(id);
      if (this.editing()?.id === id) {
        this.cancelEdit();
      }
    }
  }

  moveService(id: string, direction: 'up' | 'down'): void {
    this.servicesService.reorder(id, direction);
  }

  resetServices(): void {
    if (confirm('Reset all services to defaults?')) {
      this.servicesService.resetToDefaults();
      this.cancelEdit();
    }
  }
}
