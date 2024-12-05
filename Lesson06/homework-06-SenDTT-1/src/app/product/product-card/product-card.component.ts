import { Component, Input } from '@angular/core';
import { Product } from '../product.type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() $product: Product | null = null;

  constructor(private route: ActivatedRoute) {}

  get recipeName(): string {
    return this.$product?.title || '';
  }

  get productImage(): string {
    if (this.$product?.images && this.$product.images.length > 0) {
      return this.$product?.images[0];
    }

    return '';
  }
}
