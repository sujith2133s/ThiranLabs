import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ServicesService } from '../../core/services/services.service';
import { LeadForm } from '../../shared/components/lead-form/lead-form';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { Scene3d } from '../../shared/components/scene-3d/scene-3d';
import { Tilt3dDirective } from '../../shared/directives/tilt-3d.directive';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LeadForm, CtaBanner, Scene3d, Tilt3dDirective, ScrollRevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly contentService = inject(ContentService);
  private readonly servicesService = inject(ServicesService);

  protected readonly hero = this.contentService.hero;
  protected readonly services = this.servicesService.allServices;

  protected getIcon(icon: string): string {
    const icons: Record<string, string> = {
      palette: '🎨',
      code: '💻',
      rocket: '🚀',
      refresh: '✨',
      cart: '🛒',
      support: '🛡️',
    };
    return icons[icon] ?? '◆';
  }
}
