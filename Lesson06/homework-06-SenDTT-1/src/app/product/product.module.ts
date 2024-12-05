import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  SlicePipe,
} from '@angular/common';
import { ProductComponent } from './product.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { productRoutes } from './product.routing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductCardComponent } from './product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductCardComponent,
    ProductDetailComponent,
    FormComponent,
  ],
  imports: [
    RouterModule.forChild(productRoutes),
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    SlicePipe,
    CurrencyPipe,
    DatePipe,
    ReactiveFormsModule,
  ],
  exports: [
    ProductComponent,
    ProductCardComponent,
    ProductDetailComponent,
    FormComponent,
  ],
  providers: [HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [ProductComponent],
})
export class ProductModule {}
