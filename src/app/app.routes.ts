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
    // rota com parâmetro
    // :marcaId e :modeloId serão capturados no ActivatedRoute
    path: 'detalhes/:marcaId/:modeloId',
    loadComponent: () => import('./detalhes/detalhes.page').then( m => m.DetalhesPage)
  },
];
