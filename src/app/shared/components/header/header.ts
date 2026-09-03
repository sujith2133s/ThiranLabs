import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly navLinks = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About', exact: false },
    { path: '/services', label: 'Services', exact: false },
    { path: '/contact', label: 'Contact', exact: false },
  ];

  protected menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
