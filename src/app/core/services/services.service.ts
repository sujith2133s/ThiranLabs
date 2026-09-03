import { Injectable, signal, computed } from '@angular/core';
import { ServiceItem } from '../models/service.model';

const STORAGE_KEY = 'thiranlabs_services';

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Web Design',
    description:
      'Custom, responsive designs that reflect your brand identity and captivate your audience from the first click.',
    icon: 'palette',
    features: ['UI/UX Design', 'Brand Integration', 'Mobile-First Layouts', 'Design Systems'],
    order: 0,
  },
  {
    id: '2',
    title: 'Web Development',
    description:
      'Clean, performant websites built with modern frameworks—fast loading, accessible, and easy to maintain.',
    icon: 'code',
    features: ['Angular & React', 'Performance Optimization', 'SEO Foundations', 'Cross-Browser Support'],
    order: 1,
  },
  {
    id: '3',
    title: 'Landing Pages',
    description:
      'High-converting landing pages designed to turn visitors into customers with compelling copy and clear CTAs.',
    icon: 'rocket',
    features: ['Conversion Focus', 'A/B Ready Layouts', 'Analytics Integration', 'Fast Turnaround'],
    order: 2,
  },
  {
    id: '4',
    title: 'Website Redesign',
    description:
      'Breathe new life into outdated sites with a fresh look, improved UX, and updated technology stack.',
    icon: 'refresh',
    features: ['UX Audit', 'Visual Refresh', 'Content Migration', 'Launch Support'],
    order: 3,
  },
  {
    id: '5',
    title: 'E-Commerce Setup',
    description:
      'Online stores that make selling simple—secure checkout, inventory management, and a seamless shopping experience.',
    icon: 'cart',
    features: ['Product Catalogs', 'Payment Integration', 'Order Management', 'Mobile Shopping'],
    order: 4,
  },
  {
    id: '6',
    title: 'Ongoing Support',
    description:
      'Keep your site running smoothly with maintenance plans, updates, and dedicated support when you need it.',
    icon: 'support',
    features: ['Monthly Updates', 'Security Patches', 'Content Changes', 'Priority Support'],
    order: 5,
  },
];

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private readonly services = signal<ServiceItem[]>(this.load());

  readonly allServices = computed(() =>
    [...this.services()].sort((a, b) => a.order - b.order)
  );

  getById(id: string): ServiceItem | undefined {
    return this.services().find((s) => s.id === id);
  }

  add(service: Omit<ServiceItem, 'id'>): void {
    const newService: ServiceItem = {
      ...service,
      id: crypto.randomUUID(),
    };
    this.services.update((list) => [...list, newService]);
    this.save();
  }

  update(id: string, changes: Partial<ServiceItem>): void {
    this.services.update((list) =>
      list.map((s) => (s.id === id ? { ...s, ...changes } : s))
    );
    this.save();
  }

  remove(id: string): void {
    this.services.update((list) => list.filter((s) => s.id !== id));
    this.save();
  }

  reorder(id: string, direction: 'up' | 'down'): void {
    const sorted = [...this.allServices()];
    const index = sorted.findIndex((s) => s.id === id);
    if (index === -1) return;

    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= sorted.length) return;

    const currentOrder = sorted[index].order;
    sorted[index].order = sorted[swapIndex].order;
    sorted[swapIndex].order = currentOrder;

    this.services.set(sorted);
    this.save();
  }

  resetToDefaults(): void {
    this.services.set([...DEFAULT_SERVICES]);
    this.save();
  }

  private load(): ServiceItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      /* use defaults */
    }
    return [...DEFAULT_SERVICES];
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.services()));
  }
}
