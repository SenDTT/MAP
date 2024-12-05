import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductList } from './product.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = environment.apiUrl + 'products';
  constructor(private httpClient: HttpClient) {}

  getAllProducts(params: any) {
    return this.httpClient.get<ProductList>(this.apiUrl, { params });
  }

  getProductById(id: number) {
    return this.httpClient.get<Product>(this.apiUrl + `/${id}`);
  }

  addProduct(data: any) {
    return this.httpClient.post<Product>(this.apiUrl + '/add', data);
  }

  updateProduct(id: number, data: any) {
    return this.httpClient.put<Product>(this.apiUrl + `/${id}`, data);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete<Product>(this.apiUrl + `/${id}`);
  }
}
