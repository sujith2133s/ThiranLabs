import { Directive, ElementRef, inject, input, NgZone, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appTilt3d]',
})
export class Tilt3dDirective implements OnInit, OnDestroy {
  readonly intensity = input(14);

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly ngZone = inject(NgZone);

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('tilt-3d');

    this.ngZone.runOutsideAngular(() => {
      element.addEventListener('mousemove', this.onMove);
      element.addEventListener('mouseleave', this.onLeave);
    });
  }

  ngOnDestroy(): void {
    const element = this.el.nativeElement;
    element.removeEventListener('mousemove', this.onMove);
    element.removeEventListener('mouseleave', this.onLeave);
  }

  private readonly onMove = (event: MouseEvent): void => {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const tilt = this.intensity();

    element.style.transform = `perspective(900px) rotateY(${x * tilt}deg) rotateX(${-y * tilt}deg) translateZ(12px)`;
  };

  private readonly onLeave = (): void => {
    this.el.nativeElement.style.transform = '';
  };
}
