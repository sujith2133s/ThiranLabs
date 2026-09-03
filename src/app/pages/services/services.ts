import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ServicesService } from '../../core/services/services.service';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { Scene3d } from '../../shared/components/scene-3d/scene-3d';
import { Tilt3dDirective } from '../../shared/directives/tilt-3d.directive';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-services',
  imports: [RouterLink, CtaBanner, Scene3d, Tilt3dDirective, ScrollRevealDirective],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  private readonly contentService = inject(ContentService);
  private readonly servicesService = inject(ServicesService);

  protected readonly headline = this.contentService.servicesHeadline;
  protected readonly intro = this.contentService.servicesIntro;
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
