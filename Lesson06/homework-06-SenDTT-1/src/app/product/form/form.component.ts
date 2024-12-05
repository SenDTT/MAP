import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.type';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() product: Product | null = null;
  productForm!: FormGroup;
  isEditMode = false;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.product;
    this.onInitForm();

    this.activatedRouter.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.productService
          .getProductById(Number(this.productId))
          .subscribe((res) => {
            this.product = res;
            this.onInitForm(res);
          });
      }
    });
  }

  onInitForm(product?: Product) {
    this.productForm = this.fb.group({
      title: [product?.title || '', Validators.required],
      description: [product?.description || '', Validators.required],
      price: [product?.price || '', [Validators.required, Validators.min(0)]],
      category: [product?.category || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      if (this.isEditMode && this.product?.id) {
        console.log('Updating product:', { ...this.product, ...formData });
        this.productService
          .updateProduct(this.product?.id, {
            ...this.product,
            ...formData,
          })
          .subscribe((res) => {
            alert('Update Successful');
            setTimeout(() => {
              this.router.navigateByUrl('/products');
            }, 1000);
          });
      } else {
        console.log('Adding new product:', formData);
        this.productService.addProduct(formData).subscribe((res) => {
          alert('Add Successful');
          setTimeout(() => {
            this.router.navigateByUrl('/products');
          }, 1000);
        });
      }
    }
  }
}
