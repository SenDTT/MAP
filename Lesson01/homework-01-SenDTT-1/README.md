[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xj9TiibJ)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17318057)
# CS572-Homework-01-Review

1. Clone this repository
2. Install the dependencies with `npm i`
   
## Exercise 01

Fix all the Type errors in the `./fixme` folder.

## Exercise 02

Complete the code for the `./exercise02/storage.ts` file, implement the methods to get, add, update, and remove key-value pairs in the `state` immutable private
property. Some methods return a `boolean` to indicate whether the operation was successfull or not. To test run the script with `npx tsx watch ./exercise02/test.ts`
  
Tips: Use the `structuredClone()` method to deep-clone the `state` object. After modifying the cloned copy, convert it to an immutable object with `Object.freeze()`.
