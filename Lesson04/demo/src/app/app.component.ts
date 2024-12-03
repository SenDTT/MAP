import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo';
  first = signal(10);
  second = computed(() => this.first() * 2);
  third = signal('Hello');

  constructor() {
    effect(() => {
      console.log(this.third());
      console.log(this.second());
    });

    setInterval(() => {
      this.first.update((prev) => prev * 10);
    }, 1000);
  }
}
