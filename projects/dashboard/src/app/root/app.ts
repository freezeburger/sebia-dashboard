import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationFeature } from '../features/navigation/navigation.feature';
import { UiModule } from '../shared/components/ui-module';
import { ReactiveComponent } from "@dashboard/theory/reactive.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationFeature, UiModule, ReactiveComponent],
  templateUrl: './app.html',
  host: { 
    class: 'd-flex flex-column',
  },
  styles:`
  :host {
    height: 100vh;
  }
  `
})
export class App {
  protected readonly title = signal('dashboard');
}
