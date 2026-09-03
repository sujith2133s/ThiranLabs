import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
        title: 'ThiranLabs — Web Design Studio',
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then((m) => m.About),
        title: 'About — ThiranLabs',
      },
      {
        path: 'services',
        loadComponent: () => import('./pages/services/services').then((m) => m.Services),
        title: 'Services — ThiranLabs',
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
        title: 'Contact — ThiranLabs',
      },
    ],
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login/admin-login').then((m) => m.AdminLogin),
    title: 'Admin Login — ThiranLabs',
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin-layout/admin-layout').then((m) => m.AdminLayout),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin/dashboard/admin-dashboard').then((m) => m.AdminDashboard),
        title: 'Dashboard — ThiranLabs Admin',
      },
      {
        path: 'content',
        loadComponent: () =>
          import('./admin/content/admin-content').then((m) => m.AdminContent),
        title: 'Content — ThiranLabs Admin',
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./admin/services/admin-services').then((m) => m.AdminServices),
        title: 'Services — ThiranLabs Admin',
      },
      {
        path: 'leads',
        loadComponent: () =>
          import('./admin/leads/admin-leads').then((m) => m.AdminLeads),
        title: 'Leads — ThiranLabs Admin',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
