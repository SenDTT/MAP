import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Root } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  $title = signal<string>('');
  $limit = signal<number>(4);
  $page = signal<number>(1);

  #skip = computed(() => {
    return (this.$page() - 1) * this.$limit();
  });

  #httpClient = inject(HttpClient);

  get_root$: Observable<Root> = new Observable<Root>();

  constructor() {
    effect(() => {
      this.get_root$ = this.#httpClient.get<Root>(
        `https://dummyjson.com/recipes?limit=${this.$limit()}&skip=${this.#skip()}`
      );
    });
  }

  onPageChange(page: number) {
    this.$page.set(page);
  }
}
