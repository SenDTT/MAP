import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'products',
        data: { title: 'Dashboard' },
        loadChildren: () =>
          import('./product/product.module').then((c) => c.ProductModule),
      },
    ],
  },
];
