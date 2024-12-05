import { Route } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormComponent } from './form/form.component';

export const productRoutes: Route[] = [
  { path: '', component: ProductComponent },
  { path: 'add', component: FormComponent },
  { path: ':id', component: ProductDetailComponent },
  { path: ':id/edit', component: FormComponent },
];
