import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { Recipe, Root } from '../../types';
import { RecipeComponent } from '../recipe/recipe.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { initialData } from '../app.component';
import { CommonService } from '../common.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  imports: [
    RecipeComponent,
    MatPaginatorModule,
    MatGridListModule,
    MatGridListModule,
    CommonModule,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  $data = input<Root>(initialData);
  common = inject(CommonService);

  currentIndex = computed<number>(() => this.common.$page());
  limit = computed<number>(() => this.common.$limit());
  currentRecipes = computed<Recipe[]>(() => {
    return this.$data()?.recipes || [];
  });
  length = computed<number>(() => this.$data()?.total);

  $updateTitle = output<string>();

  constructor() {
    effect(() => {
      const title = `Showing page ${this.currentIndex()} of ${Math.floor(
        this.length() / this.limit()
      )}`;
      this.onChangeTitle(title);
    });
  }

  onPageChange(event: any) {
    this.common.onPageChange(event.pageIndex);
  }

  trackByRecipeId(index: number, recipe: any): any {
    return recipe.id + index;
  }

  onChangeTitle(title: string) {
    this.$updateTitle.emit(title);
  }
}
