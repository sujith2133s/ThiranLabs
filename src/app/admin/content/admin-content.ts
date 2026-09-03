import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-content',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-content.html',
  styleUrl: './admin-content.css',
})
export class AdminContent {
  private readonly contentService = inject(ContentService);
  private readonly authService = inject(AuthService);
  private readonly fb = new FormBuilder();

  protected readonly saved = signal(false);
  protected readonly activeTab = signal<'hero' | 'about' | 'services' | 'contact'>('hero');

  protected readonly content = this.contentService.siteContent;

  protected readonly heroForm = this.fb.group({
    headline: [''],
    subheadline: [''],
    ctaText: [''],
  });

  protected readonly aboutForm = this.fb.group({
    headline: [''],
    intro: [''],
    mission: [''],
  });

  protected readonly servicesForm = this.fb.group({
    headline: [''],
    intro: [''],
  });

  protected readonly contactForm = this.fb.group({
    headline: [''],
    intro: [''],
    email: [''],
    phone: [''],
    whatsapp: [''],
    location: [''],
    hours: [''],
  });

  protected readonly passwordForm = this.fb.group({
    current: [''],
    newPassword: [''],
  });

  constructor() {
    this.loadForms();
  }

  setTab(tab: 'hero' | 'about' | 'services' | 'contact'): void {
    this.activeTab.set(tab);
    this.saved.set(false);
  }

  saveHero(): void {
    this.contentService.updateHero(this.heroForm.getRawValue() as never);
    this.showSaved();
  }

  saveAbout(): void {
    const { headline, intro, mission } = this.aboutForm.getRawValue();
    const about = this.content().about;
    this.contentService.updateAbout({
      ...about,
      headline: headline!,
      intro: intro!,
      mission: mission!,
    });
    this.showSaved();
  }

  saveServices(): void {
    const { headline, intro } = this.servicesForm.getRawValue();
    this.contentService.updateServicesSection(headline!, intro!);
    this.showSaved();
  }

  saveContact(): void {
    this.contentService.updateContact(this.contactForm.getRawValue() as never);
    this.showSaved();
  }

  changePassword(): void {
    const { current, newPassword } = this.passwordForm.getRawValue();
    if (this.authService.changePassword(current!, newPassword!)) {
      this.passwordForm.reset();
      alert('Password updated successfully.');
    } else {
      alert('Could not update password. Check current password and ensure new password is at least 6 characters.');
    }
  }

  resetContent(): void {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      this.contentService.resetToDefaults();
      this.loadForms();
      this.showSaved();
    }
  }

  private loadForms(): void {
    const c = this.content();
    this.heroForm.patchValue(c.hero);
    this.aboutForm.patchValue({
      headline: c.about.headline,
      intro: c.about.intro,
      mission: c.about.mission,
    });
    this.servicesForm.patchValue({
      headline: c.servicesHeadline,
      intro: c.servicesIntro,
    });
    this.contactForm.patchValue(c.contact);
  }

  private showSaved(): void {
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }
}
