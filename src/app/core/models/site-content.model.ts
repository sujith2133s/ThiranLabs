export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
}

export interface AboutContent {
  headline: string;
  intro: string;
  mission: string;
  values: { title: string; description: string }[];
  stats: { value: string; label: string }[];
}

export interface ContactContent {
  headline: string;
  intro: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  hours: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  servicesHeadline: string;
  servicesIntro: string;
  contact: ContactContent;
}
