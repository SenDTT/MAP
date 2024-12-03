import { Component, computed, signal } from '@angular/core';
import { data } from '../../data';
import { Recipe, Root } from '../../types';
import { RecipeComponent } from '../recipe/recipe.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-recipes',
  imports: [RecipeComponent, MatPaginatorModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  data = signal<Root>(data);

  currentIndex = signal<number>(0);
  currentRecipe = computed<Recipe | null>(() => {
    const recipesList = this.data().recipes;
    return (recipesList && recipesList[this.currentIndex()]) || null;
  });
  length = computed<number>(() => {
    const recipesList = this.data().recipes;
    return recipesList.length || 0;
  });

  constructor() {
    // this.currentIndex.set(0);
  }

  onPageChange(event: any) {
    this.currentIndex.set(event.pageIndex);
  }
}
