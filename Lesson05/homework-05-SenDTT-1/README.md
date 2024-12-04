### CS572-Homework-05-Services
### Exercise
1. Refactor yesterday's code and create a service layer that sends an actual HTTP Get request to `https://dummyjson.com/recipes?limit=4&skip=0` and display 4 recipes at a time. Practice working with the HTTP stream:
   * Consume the Observable with `.subscribe()`
   * Consume the Observable with `AsyncPipe`
   * Convert the Observable to a Signal
2. Create an `effect` that reacts to the current pagination index and change the page title to show: `Showing page {current} of {total}`. Use the `Title` service to set the page. 
