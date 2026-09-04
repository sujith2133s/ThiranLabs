import { Injectable, signal, computed } from '@angular/core';
import { SiteContent } from '../models/site-content.model';

const STORAGE_KEY = 'thiranlabs_content';

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    headline: 'Crafting Digital Experiences That Inspire',
    subheadline:
      'ThiranLabs helps businesses stand out with thoughtful web design, seamless user experiences, and modern development that drives results.',
    ctaText: 'Request a Free Quote',
  },
  about: {
    headline: 'Design With Purpose, Build With Passion',
    intro:
      'ThiranLabs is a freelance web design studio dedicated to creating beautiful, functional websites for businesses of every size. We blend creative vision with technical expertise to deliver digital experiences that connect with your audience.',
    mission:
      'Our mission is to empower brands through exceptional web design—making professional digital presence accessible, approachable, and impactful.',
    values: [
      {
        title: 'Clarity First',
        description:
          'Every design decision serves a purpose. We cut through complexity to create interfaces that feel intuitive and effortless.',
      },
      {
        title: 'Collaborative Spirit',
        description:
          'Your vision guides our work. We listen closely, communicate openly, and treat every project as a true partnership.',
      },
      {
        title: 'Quality Craft',
        description:
          'From pixel-perfect layouts to clean, maintainable code—we take pride in delivering work that stands the test of time.',
      },
    ],
    stats: [
      { value: '50+', label: 'Projects Delivered' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '5+', label: 'Years Experience' },
      { value: '24h', label: 'Response Time' },
    ],
  },
  servicesHeadline: 'Services Tailored to Your Goals',
  servicesIntro:
    'From concept to launch, we offer end-to-end web design and development services designed to elevate your brand online.',
  contact: {
    headline: 'Let\'s Start Your Project',
    intro:
      'Ready to bring your vision to life? Share your project details and we\'ll get back to you within 24 hours with a personalized quote.',
    email: 'thiranlabs.co@gmail.com',
    phone: '+91 9894155530',
    whatsapp: ' +91 9994738638',
    location: 'Remote · Worldwide',
    hours: 'Mon–Fri, 9am–6pm EST',
  },
};

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly content = signal<SiteContent>(this.load());

  readonly siteContent = this.content.asReadonly();
  readonly hero = computed(() => this.content().hero);
  readonly about = computed(() => this.content().about);
  readonly contact = computed(() => this.content().contact);
  readonly servicesHeadline = computed(() => this.content().servicesHeadline);
  readonly servicesIntro = computed(() => this.content().servicesIntro);

  updateContent(partial: Partial<SiteContent>): void {
    const updated = { ...this.content(), ...partial };
    this.content.set(updated);
    this.save(updated);
  }

  updateHero(hero: SiteContent['hero']): void {
    this.updateContent({ hero });
  }

  updateAbout(about: SiteContent['about']): void {
    this.updateContent({ about });
  }

  updateContact(contact: SiteContent['contact']): void {
    this.updateContent({ contact });
  }

  updateServicesSection(headline: string, intro: string): void {
    this.updateContent({ servicesHeadline: headline, servicesIntro: intro });
  }

  resetToDefaults(): void {
    this.content.set({ ...DEFAULT_CONTENT });
    this.save(DEFAULT_CONTENT);
  }

  private load(): SiteContent {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_CONTENT, ...JSON.parse(stored) };
      }
    } catch {
      /* use defaults */
    }
    return { ...DEFAULT_CONTENT };
  }

  private save(content: SiteContent): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }
}
