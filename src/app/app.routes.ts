import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UsersPageComponent } from './users-page/users-page.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page.component').then(c => c.HomePageComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./users-page/users-page.component').then(c => c.UsersPageComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./not-found-page/not-found-page.component').then(c => c.NotFoundPageComponent)
  },
];