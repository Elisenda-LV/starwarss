import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
  },

  {
    path: 'starships',
    title: 'Starships',
    loadComponent: () => import('./components/starships/starships.component').then(c => c.StarshipsComponent),
  },

  {
    path: 'starships/:id',
    title: 'Ships Card',
    loadComponent: () => import('./components/starships/ship-card/ship-card.component').then(c => c.ShipCardComponent),
  },

  {
    path: 'auth/login',
    title: 'Login',
    loadComponent:() => import('./components/auth/login/login.component').then(c => c.LoginComponent),
  },

  {
    path: 'auth/register',
    title: 'Register',
    loadComponent: () => import ('./components/auth/register/register.component').then(c => c.RegisterComponent),
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: '',
  }


];
