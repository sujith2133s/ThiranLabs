import { Directive, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  readonly delay = input(0);
  readonly variant = input<'up' | 'left' | 'right' | 'scale'>('up');

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('scroll-reveal', `scroll-reveal--${this.variant()}`);

    if (this.delay() > 0) {
      element.style.transitionDelay = `${this.delay()}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('scroll-reveal--visible');
          this.observer?.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
