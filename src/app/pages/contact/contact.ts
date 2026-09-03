import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { LeadForm } from '../../shared/components/lead-form/lead-form';
import { Scene3d } from '../../shared/components/scene-3d/scene-3d';
import { Tilt3dDirective } from '../../shared/directives/tilt-3d.directive';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [LeadForm, Scene3d, Tilt3dDirective, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly contentService = inject(ContentService);
  protected readonly contact = this.contentService.contact;

  protected whatsappUrl(): string {
    const digits = this.contact().whatsapp.replace(/\D/g, '');
    return digits ? `https://wa.me/${digits}` : '#';
  }
}
