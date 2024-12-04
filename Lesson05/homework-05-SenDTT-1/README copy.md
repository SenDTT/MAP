[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/-91ZkPp3)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17401988)

### CS572-Homework-04-Signals

1. Save the response from [DummyJSON API](https://dummyjson.com/recipes) in a file `data.ts` as follows

```typescript
export const data = {
  "recipes": [
    {
      "id": 1,
      "name": "Classic Margherita Pizza",
      "ingredients": [
        "Pizza dough",
        "Tomato sauce",
        "Fresh mozzarella cheese",
        "Fresh basil leaves",
        "Olive oil",
        "Salt and pepper to taste"
      ],
      "instructions": [
        "Preheat the oven to 475°F (245°C).",
        "Roll out the pizza dough and spread tomato sauce evenly.",
        "Top with slices of fresh mozzarella and fresh basil leaves.",
        "Drizzle with olive oil and season with salt and pepper.",
        "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
        "Slice and serve hot."
      ],
      "prepTimeMinutes": 20,
      "cookTimeMinutes": 15,
      "servings": 4,
      "difficulty": "Easy",
      "cuisine": "Italian",
      "caloriesPerServing": 300,
      "tags": [
        "Pizza",
        "Italian"
      ],
      "userId": 166,
      "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
      "rating": 4.6,
      "reviewCount": 98,
      "mealType": [
        "Dinner"
      ]
    },
  {...}
]}
```

2. Use [JSON to TypeScript](https://transform.tools/json-to-typescript) tool to generate and save the response type.
3. Install [Angular Material](https://material.angular.io/) and get familiar with (`Card`, `Paginator`) components.
4. Create a component `Recipes` to be used as container (stateful) holds the data as signal, and another `Recipe` to be used as reusable component (stateless), it receives the data via `input` signal and display it.
5. Starting with `index = 0`, display one recipe at a time, and use the `Paginator` component to navigate between the recipes.

- Use `signal` to hold the recipes state.
- Use `computed` to compute the displayed recipe from the currently selected index.

6. Use `slice` pipe to truncate the card title.

### Optional

Research and write a summary for how Change Detection works in Angular, highlight the role of Zones, how can we improve its scope, and how can we create Zoneless applications.

- How Change Detection works in Angular: Angular compares the current data with the previous state in a process called a "digest cycle,", triggered by user actions or async events.

- Highlight the role of Zones: Zones auto-track async operations, telling Angular when to check for changes.

- How can we improve its scope: Use `OnPush` strategy or manually control updates with `ChangeDetectorRef`.

- How can we create Zoneless applications: Disable Zones for better performance and manually handle updates using RxJS or `ChangeDetectorRef.detectChanges()`.
