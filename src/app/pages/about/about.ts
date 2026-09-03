import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { Scene3d } from '../../shared/components/scene-3d/scene-3d';
import { Tilt3dDirective } from '../../shared/directives/tilt-3d.directive';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  imports: [CtaBanner, Scene3d, Tilt3dDirective, ScrollRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private readonly contentService = inject(ContentService);
  protected readonly about = this.contentService.about;
}
