import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly contentService = inject(ContentService);
  protected readonly contact = this.contentService.contact;
  protected readonly year = new Date().getFullYear();
}
