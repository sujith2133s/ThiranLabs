import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <div class="layout">
      <app-header />
      <main class="layout__main">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: `
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100dvh;
    }
    .layout__main {
      flex: 1;
    }
  `,
})
export class PublicLayout {}
