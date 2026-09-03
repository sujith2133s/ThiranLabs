import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-banner',
  imports: [RouterLink],
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.css',
})
export class CtaBanner {
  readonly headline = input('Ready to Transform Your Online Presence?');
  readonly subtext = input('Let\'s discuss your project and create something exceptional together.');
  readonly buttonText = input('Get in Touch');
  readonly buttonLink = input('/contact');
}
