import { Component, effect, OnInit, signal } from '@angular/core';
import { ProductService } from './product.service';
import { GetProductsParams, Product } from './product.type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productList: Product[] = [];
  total: number = 0;
  readonly $limit = signal<number>(12);
  $page = signal<number>(1);

  params: GetProductsParams = {
    limit: this.$limit(),
    skip: (this.$page() - 1) * this.$limit(),
  };
  title = 'Products';
  constructor(private productService: ProductService) {
    effect(() => {
      this.params = {
        limit: this.$limit(),
        skip: (this.$page() - 1) * this.$limit(),
      };
      this.loadProducts();
    });
  }

  ngOnInit(): void {}

  loadProducts() {
    this.productService.getAllProducts(this.params).subscribe((res) => {
      this.productList = res.products || [];
      this.total = res.total;
    });
  }

  onPageChange(event: any) {
    this.$page.set(event.pageIndex + 1);
  }

  trackByProductId(index: number, product: Product): any {
    return product.id + index;
  }
}
