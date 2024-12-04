import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { Observable } from 'rxjs';
import { Root } from '../types';
import { CommonService } from './common.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
export const initialData = {
  recipes: [],
  total: 0,
  skip: 0,
  limit: 4,
};
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecipesComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  initialData = initialData;
  // title = "I'm Sen";
  $root = new Observable<Root>();
  $root1 = signal<Root>(initialData);
  common = inject(CommonService);
  $title = signal<string>("Loading...");
  // Convert the Observable to a Signal
  $root2 = toSignal(this.common.get_root$, { initialValue: initialData });

  constructor() {
    // Consume the Observable with .subscribe()
    this.common.get_root$.subscribe((res) => {
      this.$root1.set(res);
    });

    this.$root = this.common.get_root$;
  }

  updateTitle(title: string) {
    this.$title.set(title);
  }
}
