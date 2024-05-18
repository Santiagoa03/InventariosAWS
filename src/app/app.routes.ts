import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inventario',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
  },
  { path: '**', redirectTo: 'inventario' },
];
