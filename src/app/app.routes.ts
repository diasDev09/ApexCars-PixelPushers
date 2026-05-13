import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    // O ':codigoMarca' é o parâmetro dinâmico — o valor real vai na URL
    path: 'detalhes/:codigoMarca',
    loadComponent: () => import('./detalhes/detalhes.page').then( m => m.DetalhesPage)
  },
];
