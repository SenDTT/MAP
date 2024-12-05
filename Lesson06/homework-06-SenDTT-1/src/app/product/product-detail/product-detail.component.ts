import { Component } from '@angular/core';
import { Product } from '../product.type';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService
        .getProductById(Number(productId))
        .subscribe((data) => {
          this.product = data;
        });
    }
  }

  onDeleteProduct(id: number | undefined) {
    if (id) {
      this.productService.deleteProduct(id).subscribe((res) => {
        console.log(res);
        alert('Delete Successful');

        setTimeout(() => {
          this.router.navigateByUrl('/products');
        }, 1000);
      });
    }
  }
}
