import { Component, effect, input, output } from '@angular/core';
import { Recipe } from '../../types';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    CommonModule,
    SlicePipe,
  ],
})
export class RecipeComponent {
  $recipe = input<Recipe | null>(null);

  constructor() {}
}
