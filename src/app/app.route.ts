import { Route } from '@angular/router';

import { CreateClientComponent } from './components/create-client';



export const APP_ROUTE: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'create', component: CreateClientComponent },
  { path: 'home', loadChildren: () => import('./modules').then(m => m.HomeModule) }
];